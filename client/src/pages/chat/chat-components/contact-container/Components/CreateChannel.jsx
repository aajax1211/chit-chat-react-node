import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { getColor } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import { GET_ALL_CONTACTS_ROUTES, HOST, SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useAppStore } from "@/store/store";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/MultiSelect";
  

export default function CreateChannel() {
    const {setSelectedChatData, setSelectedChatType} = useAppStore()

    const [newChannelModel, setNewChannelModel] = useState(false)
    const [searchList,setSearchList] = useState([])
    const [allContacts,setAllContacts] = useState([])
    const [selectedContact, setSelectedContact] = useState([])
    const [channelName,setChannelName] = useState("")

    useEffect(()=>{
        const getData = async ()=>{
            const response = await apiClient.get(GET_ALL_CONTACTS_ROUTES, {withCredentials : true})
            setAllContacts(response.data.contacts)
        }
        getData()
    },[])


    const createChannel = async ()=>{

    }
  return <>
  <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus
                            className="text-neutral-400 font-light text-opacity-90 text-small hover:text-neutral-100 cursor-pointer transition-all duration-300"
                            onClick={()=>setNewChannelModel(true)}></FaPlus>
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
                        <p>Create new Channel</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Dialog open={newChannelModel} onOpenChange={setNewChannelModel}>
  <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
    <DialogHeader>
      <DialogTitle className="self-center" >Please fill up the details for new channel</DialogTitle>
      <DialogDescription>

      </DialogDescription>
    </DialogHeader>
    <div>
        <Input  placeholder="Channel Name" className="rounded-lg p-6 bg-[#2c2e3b] border-none" onChange={(e) => setChannelName(e.target.value)} value={channelName}></Input>
    </div>
    <div>
        <MultipleSelector className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white" defaultOptions = {allContacts} placeholder="Search Contacts"
        value={selectedContact} onChange={setSelectedContact} emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600">No results found</p>
        }></MultipleSelector>
    </div>
    <div>
        <Button className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={createChannel}>Create Channel</Button>
    </div>
  </DialogContent>
</Dialog>
</>
}
