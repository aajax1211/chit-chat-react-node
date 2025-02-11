import {useAppStore} from "@/store/store";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";
import ContactContainer from "./chat-components/contact-container/ContactContainer";
import ChatContainer from "./chat-components/chat-container/ChatContainer";
import EmptyChatContainer from "./chat-components/empty-chat-container/EmptyChatContainer";

export default function Chat() {

    const {
        userInfo,
        selectedChatType,
        isUploading,
        isDownloading,
        fileUploadProgress,
        fileDownloadProgress
    } = useAppStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo.profileSetup) {
            toast("Please setup profile to continue")
            navigate("/profile");
        }
    }, [userInfo, navigate])

    return <div className="flex h-[100vh] text-white overflow-hidden"> 
    {isUploading && <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col col-5 backdrop-blur-lg">
    <h5 className="text-5xl animate-pulse">Uploading File</h5>
    {fileUploadProgress}%
    </div>}
    {isDownloading && <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col col-5 backdrop-blur-lg">
    <h5 className="text-5xl animate-pulse">Downloading File</h5>
    {fileDownloadProgress}%
    </div>}
        <ContactContainer/> {selectedChatType === undefined
            ? <EmptyChatContainer/>
            : <ChatContainer/>
}
    </div>;
}