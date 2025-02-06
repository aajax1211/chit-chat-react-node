import {useAppStore} from "@/store/store";
import {useEffect, useRef} from "react";
import moment from "moment"
import {apiClient} from "@/lib/api-client";
import {GET_ALL_MESSAGES_ROUTE} from "@/utils/constants";

export default function MessageContainer() {
    const scrollRef = useRef()
    const {selectedChatType, selectedChatData, selectedChatMessages, setSelectedChatMessages} = useAppStore()

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
                            {moment(message.timestamp).format("LL")}
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
                <div className="text-xs text-gray-600 ">
                    {moment(message.timestamp).format("LT")}
                </div>
            </div>
        )
    }
    return <div
        className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[60vw] lg:w-[70vw] xl:w-[80vw] w-full">
        {renderMessages()}
        <div ref={scrollRef}></div>
    </div>;
}
