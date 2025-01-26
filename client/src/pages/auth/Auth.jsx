import React, { useState } from "react";
import Background from "../../assets/login2.png"
import Victory from "../../assets/victory.svg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/store";

export default function Auth() {

  const navigate = useNavigate()

  const {setUserInfo} = useAppStore()

  const [formState , setFormState] = useState({
    email : "",
    password : "",
    confirmPassword : "",
  })

  const [activeTab , setActiveTab] = useState("login") 

  const handleInputChange = (field,value) =>{
    setFormState((prev)=> ({...prev, [field] : value}))
  }

  const validateForm = () =>{
    const {email , password , confirmPassword } = formState

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{6,}$/;


    if(!email.length){
      toast.error("Email is required")
      return false
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return false;
    }
    if(!password.length){
      toast.error("Password is required")
      return false
    }

    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 6 characters long, include an uppercase letter, a number, and a special character.");
      return false;
    }

    if(activeTab === "signup" && password !== confirmPassword){
      toast.error("Password and confirm password should be same")
      return false
    }
    return true
  } 

  const handleSubmit = async ()=>{

    const {email , password , confirmPassword} = formState

    if(!validateForm()){
      return;
    }

    try {

      const route = activeTab === "login" ? LOGIN_ROUTE : SIGNUP_ROUTE ;

      const payload = activeTab === "login" ? {email , password} : {email, password, confirmPassword};
      
        const response = await apiClient.post(route,payload, {withCredentials: true})

        if(response.data.user.id){
          setUserInfo(response.data.user)
          if(response.data.user.profileSetup){
            navigate("/chat")
          }else(
            navigate("/profile")
          )
        }

        console.log(response.data)
        toast.success(`${activeTab === "login" ? "Login" : "Signup"} Successful`)

        if(activeTab === "signup"){
          setActiveTab("login")
        }
      }catch(error){
        const errorMessage =
      error.response?.data ||  
      error.message ||           
      "Something went wrong"; 
        toast.error(errorMessage)
      }

    
      
    
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

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-3/4">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value="login">Login</TabsTrigger>
                <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value="signup">Signup</TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">

                <Input placeholder="Email" type="email" className="rounded-full p-6" value={formState.email} onChange={(e) => handleInputChange("email", e.target.value)}></Input>

                <Input placeholder="Password" type="password" className="rounded-full p-6" value={formState.password} onChange={(e) => handleInputChange("password", e.target.value)}></Input>

                <Button className="rounded-full p-6" onClick={handleSubmit}>Login</Button>
              </TabsContent>

              <TabsContent className="flex flex-col gap-5" value="signup">

                <Input placeholder="Email" type="Email" className="rounded-full p-6" value={formState.email} onChange={(e) => handleInputChange("email", e.target.value)}></Input>

                <Input placeholder="Password" type="Password" className="rounded-full p-6" value={formState.password} onChange={(e) => handleInputChange("password", e.target.value)}></Input>

                <Input placeholder="Confirm Password" type="Password" className="rounded-full p-6" value={formState.confirmPassword} onChange={(e) => handleInputChange("confirmPassword", e.target.value)}></Input>

                <Button className="rounded-full p-6" onClick={handleSubmit}>Signup</Button>

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
