import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import { apiClient } from "@/lib/api-client";
import {getColor} from "@/lib/utils";
import {useAppStore} from "@/store/store";
import {HOST, LOGOUT_ROUTE} from "@/utils/constants";
import {Avatar, AvatarImage} from "@radix-ui/react-avatar";
import {FiEdit2} from "react-icons/fi";
import {IoPowerSharp} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import { toast } from "sonner";

export default function ProfileInfo() {
    const navigate = useNavigate()
    const {userInfo,setUserInfo} = useAppStore()

    const logout = async () =>{

        try {
            const response = await apiClient.post(LOGOUT_ROUTE,{},{withCredentials : true})
        if(response.status === 200){
            toast.success("Logout Successful")
            navigate("/auth")
            setUserInfo()
        }
        } catch (error) {
            console.log(error)
        }
        
    }  
    return <div
        className="absolute bottom-0 h-16 flex justify-between items-center px-10 w-full bg-[#2a2b33]">
        <div className="flex gap-3 items-center justify-center">
            <div className="w-12 h-12 relative ">
                <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                    {userInfo.image
                        ? <AvatarImage
                                src={`${HOST}${userInfo.image}`}
                                alt="profile"
                                className="object-cover w-full h-full bg-black rounded-full"/>
                        : <div
                            className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full text-white ${getColor(userInfo.color)}`}>
                            {userInfo.firstName
                                ? userInfo
                                    .firstName
                                    .charAt(0)
                                : userInfo
                                    .email
                                    .charAt(0)
}

                        </div>
}
                </Avatar>
            </div>
            <div>
                {userInfo.firstName && userInfo.lastName
                    ? `${userInfo.firstName} ${userInfo.lastName}`
                    : ""}
            </div>
        </div>
        <div className="flex gap-5">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FiEdit2
                            className="text-purple-500 text-xl font-medium"
                            onClick={() => navigate("/profile")}></FiEdit2>
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                        <p>Edit Profile</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <IoPowerSharp
                            className="text-purple-500 text-xl font-medium"
                            onClick={logout}></IoPowerSharp>
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                        <p>Logout</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        </div>
    </div>;
}
