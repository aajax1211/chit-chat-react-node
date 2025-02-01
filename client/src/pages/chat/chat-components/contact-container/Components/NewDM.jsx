import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import Lottie from "react-lottie";
import { animationsDefaultOptions, getColor } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import { HOST, SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useAppStore } from "@/store/store";
  


export default function NewDM() {

    const {setSelectedChatData, setSelectedChatType} = useAppStore()

    const [openNewContactModel, setOpenNewContactModel] = useState(false)
    const [searchList,setSearchList] = useState([])

    const searchContacts = async (searchTerm) =>{
        try {
            console.log("Searching for:", searchTerm); 
            if(searchTerm !== ""){
                const response = await apiClient.post(SEARCH_CONTACTS_ROUTES,{ searchTerm },{withCredentials: true})
                console.log(response.status)
                if(response.status === 200 && response.data.contacts){
                    setSearchList(response.data.contacts)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const selectNewContact =(contact) =>{
        setOpenNewContactModel(false)
        setSelectedChatType("contact")
        setSelectedChatData(contact)
        setSearchList([])
    }

  return <>
  <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus
                            className="text-neutral-400 font-light text-opacity-90 text-small hover:text-neutral-100 cursor-pointer transition-all duration-300"
                            onClick={()=>setOpenNewContactModel(true)}></FaPlus>
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
                        <p>Select new contact</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
  <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
    <DialogHeader>
      <DialogTitle className="self-center" >Please select a contact</DialogTitle>
      <DialogDescription>

      </DialogDescription>
    </DialogHeader>
    <div>
        <Input  placeholder="Search Contact" className="rounded-lg p-6 bg-[#2c2e3b] border-none" onChange={(e) => searchContacts(e.target.value)}></Input>
    </div>
    
    {searchList.length <= 0 ?
    <Lottie 
    isClickToPauseDisabled={true}
    height={200}
    width={200}
    options={animationsDefaultOptions}
    ></Lottie>: <ScrollArea className="h-[250px]">
    <div className="flex flex-col gap-5">
        {searchList.map(contact => (
            <div key={contact._id} className="flex gap-3 items-center cursor-pointer" onClick={() => selectNewContact(contact)}>
                <div className="w-12 h-12 relative ">
            <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                {contact.image
                    ? <AvatarImage
                            src={`${HOST}${contact.image}`}
                            alt="profile"
                            className="object-cover w-full h-full bg-black rounded-full"/>
                    : <div
                        className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full text-white ${getColor(contact.color)}`}>
                        {contact.firstName
                            ? contact
                                .firstName
                                .charAt(0)
                            : contact
                                .email
                                .charAt(0)
}

                    </div>
}
            </Avatar>

        </div>
        <div className="flex flex-col">
            <span>
        {contact.firstName && contact.lastName
                ? `${contact.firstName} ${contact.lastName}`
                : contact.email}</span>
                <span className="text-xs">{contact.email}</span>
        </div>
            </div>
        ) )}
    </div>
</ScrollArea> }
  </DialogContent>
</Dialog>

  </>;

}
