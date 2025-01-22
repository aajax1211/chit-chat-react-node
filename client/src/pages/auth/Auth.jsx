import React, { useState } from "react";
import Background from "../../assets/login2.png"
import Victory from "../../assets/victory.svg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async ()=>{

  }

  const handleSignup = async ()=>{
    
  }
  


  return <div className="h-[100vh] w-[100vw] flex items-center justify-center">
    <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[90vw] md:w-[90vh] lg:w-[70vw] xl:w-[60vw] rounded-3xl xl:grid-cols-2 flex items-center justify-center">
      
      <div className="flex flex-col md:flex-row gap-5 md:gap-10 items-center justify-center">

        <div className="flex flex-1 items-center justify-center flex-col w-full  px-4">

          <div className="flex flex-row items-center justify-center">

          
            <h1 className="text-4xl font-bold sm:text-5xl md:text-5xl break-words text-center">
              Welcome
              
            </h1>

            <img src={Victory} alt="Victory emoji"  className="h-[80px] md:h-[100px]"/>

          </div>
          <p className="font-medium text-center">
              Fill in the details to get started with the best chat app !
            </p>
          <div className="flex items-center justify-center w-full">

            <Tabs className="w-3/4">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value="login">Login</TabsTrigger>
                <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value="signup">Signup</TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">

                <Input placeholder="Email" type="Email" className="rounded-full p-6" value={email} onChange={e=> setEmail(e.target.value)}></Input>

                <Input placeholder="Password" type="Password" className="rounded-full p-6" value={password} onChange={e=> setPassword(e.target.value)}></Input>

                <Button className="rounded-full p-6" onClick={handleLogin}>Login</Button>
              </TabsContent>

              <TabsContent className="flex flex-col gap-5" value="signup">

                <Input placeholder="Email" type="Email" className="rounded-full p-6" value={email} onChange={e=> setEmail(e.target.value)}></Input>

                <Input placeholder="Password" type="Password" className="rounded-full p-6" value={password} onChange={e=> setPassword(e.target.value)}></Input>

                <Input placeholder="Confirm Password" type="Password" className="rounded-full p-6" value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)}></Input>

                <Button className="rounded-full p-6" onClick={handleSignup}>Signup</Button>

              </TabsContent>
            </Tabs>

          </div>
        </div>
        <div className="hidden  xl:flex flex-1  justify-center items-center">
          <img src={Background} alt="background login"  className=" w-full h-auto xl:h-[700px] "/>
        </div>
      </div>
    </div>
  </div>;
}
