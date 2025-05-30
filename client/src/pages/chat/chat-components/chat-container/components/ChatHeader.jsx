import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store/store";
import { HOST } from "@/utils/constants";
import {RiCloseFill} from "react-icons/ri"

export default function ChatHeader() {

  const {closeChat , selectedChatData, selectedChatType}= useAppStore()

  return <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-center">
    <div className="flex gap-5 items-center w-full justify-between p-5">
        <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative ">
            <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                {selectedChatData.image
                    ? <AvatarImage
                            src={`${HOST}${selectedChatData.image}`}
                            alt="profile"
                            className="object-cover w-full h-full bg-black rounded-full"/>
                    : <div
                        className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full text-white ${getColor(selectedChatData.color)}`}>
                        {selectedChatData.firstName
                            ? selectedChatData
                                .firstName
                                .charAt(0)
                            : selectedChatData
                                .email
                                .charAt(0)
}

                    </div>
}
            </Avatar>

        </div>
        <div>
          {selectedChatType === "contact" && selectedChatData.firstName !== undefined ? `${selectedChatData.firstName} ${selectedChatData.lastName}` : selectedChatData.email}
        </div>
        </div>
        <div className="flex items-center justify-center gap-5">
            <button onClick={closeChat} className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
                <RiCloseFill className="text-3xl" />
            </button>
        </div>
    </div>
  </div>;
}
