import { useAppStore } from "@/store/store";
import {RiCloseFill} from "react-icons/ri"

export default function ChatHeader() {

  const {closeChat}= useAppStore()

  return <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-center">
    <div className="flex gap-5 items-center">
        <div className="flex gap-3 items-center justify-center"></div>
        <div className="flex items-center justify-center gap-5">
            <button onClick={closeChat} className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
                <RiCloseFill className="text-3xl" />
            </button>
        </div>
    </div>
  </div>;
}
