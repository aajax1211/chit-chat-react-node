import {useAppStore} from "@/store/store";
import {useEffect, useRef, useState} from "react";
import moment from "moment"
import {apiClient} from "@/lib/api-client";
import {GET_ALL_MESSAGES_ROUTE, HOST} from "@/utils/constants";
import {MdFolderZip} from "react-icons/md"
import {IoMdArrowRoundDown} from "react-icons/io"
import { IoCloseSharp } from "react-icons/io5";

export default function MessageContainer() {
    const scrollRef = useRef()
    const {selectedChatType, selectedChatData, selectedChatMessages, setSelectedChatMessages,setFileDownloadProgress,setIsDownloading} = useAppStore()
    const [showImage, setShowImage] = useState(false)
    const [imageURL, setImageURL] = useState(null)
    useEffect(() => {
        if (selectedChatData._id) {
            if (selectedChatType === "contact") {
                const getMessages = async() => {
                    try {
                        const response = await apiClient.post(GET_ALL_MESSAGES_ROUTE, {
                            id: selectedChatData._id
                        }, {withCredentials: true})
                        if (response.data.messages) {
                            setSelectedChatMessages(response.data.messages)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
                getMessages()
            }
        }
    }, [selectedChatData, selectedChatType, setSelectedChatMessages])

    useEffect(() => {
        if (scrollRef.current) {
            setTimeout(() => {
                scrollRef
                    .current
                    .scrollIntoView({behavior: "smooth"})
            }, 100)
        }
    }, [selectedChatMessages])


    const checkIfImage = (fileUrl) => {
        if (!fileUrl) {
            return false; // Return false if URL is empty
        }
    
        // Regular expression to match image file extensions
        const imageRegex = /\.(jpg|jpeg|png|gif|bmp|tiff?|webp|svg|ico|heic|heif)$/i;
    
        return imageRegex.test(fileUrl);
    };

    const downloadFile = async (fileUrl) =>{
        setIsDownloading(true)
        setFileDownloadProgress(0)
        const response = await apiClient.get(`${HOST}${fileUrl}`,{responseType : "blob", onDownloadProgress:(ProgressEvent) =>{
            const {loaded, total} = ProgressEvent
            const percentCompleted = Math.round((loaded*100)/total)
            setFileDownloadProgress(percentCompleted)
        }})
        const urlBlob = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement("a")
        link.href = urlBlob
        link.setAttribute("download", fileUrl.split("/").pop())
        document.body.appendChild.link
        link.click()
        link.remove()
        window.URL.revokeObjectURL(urlBlob)
        setIsDownloading(false)

    }
    
    

    const renderMessages = () => {

        if (!Array.isArray(selectedChatMessages) || selectedChatMessages.length === 0) {
            return <div>No messages available</div>;
        }

        let lastDate = null;
        return selectedChatMessages.map((message, index) => {
            const messageDate = moment(message.timeStamp).format("YYYY-MM-DD")
            const showDate = messageDate !== lastDate;
            lastDate = messageDate

            return (

                <div key={index}>
                    {showDate && (
                        <div className="text-center text-gray-500 my-2">
                            {moment(message.timeStamp).format("LL")}
                        </div>
                    )}
                    {selectedChatType === "contact" && renderDMMessages(message)
}
                </div>
            )
        })
    }

    const renderDMMessages = (message) => {
        return (
            <div
                className={`${message.sender === selectedChatData._id
                ? "text-left"
                : "text-right"}`}>
                {message.messageType === "text" && <div
                    className={`${message.sender !== selectedChatData._id
                    ? "bg-[#8417ff]/5 text-white/80 border-[#8417ff]/50 "
                    : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"} border inline-block p-4 rounded my-1 max-w-[50%] break-words`}>
                    {message.content}
                </div>}
                {
                       message.messageType === "file"  && <div
                       className={`${message.sender !== selectedChatData._id
                       ? "bg-[#8417ff]/5 text-white/80 border-[#8417ff]/50 "
                       : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"} border inline-block p-4 rounded my-1 max-w-[50%] break-words`}>
                        {console.log(message)}
                       {checkIfImage(message.fileUrl) ? 
                       <div className="cursor-pointer" onClick={()=>{
                        setShowImage(true)
                        setImageURL(message.fileUrl)
                       }}>
                        <img src={`${HOST}${message.fileUrl}`} height={300} width={300} alt="" />
                       </div> : <div className="flex items-center justify-center gap-4">
                        <span className="text-white/80 text-3xl bg-black/20 rounded-full p-3" >
                        <MdFolderZip />
                        </span>
                        <span>{message.fileUrl.split('/').pop()}</span>
                        <span className="bg-black/20 p-3 text-2xl hover:bg-black/50 cursor-pointer transition-all duration-300 rounded-full"
                        onClick={()=>downloadFile(message.fileUrl)}>
                            <IoMdArrowRoundDown />
                        </span>
                        </div>}
                   </div>
                    }
                <div className="text-xs text-gray-600 ">
                    {moment(message.timeStamp).format("LT")}
                </div>
            </div>
        )
    }
    return <div
        className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[60vw] lg:w-[70vw] xl:w-[80vw] w-full">
        {renderMessages()}
        <div ref={scrollRef}></div>
        {
            showImage && <div className="fixed z-[1000] top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center backdrop-blur-lg flex-col">
                <div>
                    <img src={`${HOST}${imageURL}`} alt=""  className="h-[70vh] w-[80vw] bg-cover"/>

                </div>
                <div className="flex gap-5 fixed top-0 mt-5">
                <button className="bg-black/20 p-3 text-2xl hover:bg-black/50 cursor-pointer transition-all duration-300 rounded-full"
                      onClick={()=>downloadFile(imageURL)} >
                            <IoMdArrowRoundDown />
                        </button>

                <button className="bg-black/20 p-3 text-2xl hover:bg-black/50 cursor-pointer transition-all duration-300 rounded-full"
                      onClick={()=>{setShowImage(false)
                        setImageURL(null)}
                      } >
                            <IoCloseSharp />
                        </button>
                </div>
            </div>
            }
    </div>;
}
