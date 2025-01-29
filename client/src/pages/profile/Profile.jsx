import {useAppStore} from "@/store/store";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IoArrowBack} from "react-icons/io5"
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {colors, getColor} from './../../lib/utils';
import {FaPlus, FaTrash} from 'react-icons/fa'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {apiClient} from "@/lib/api-client";
import {ADD_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_ROUTE} from "@/utils/constants";

export default function Profile() {

    const navigate = useNavigate()
    const {
        userInfo = {},
        setUserInfo
    } = useAppStore()
    const [profileDetails,
        setProfileDetails] = useState({firstName: "", lastName: "", image: null, hovered: false, selectedColor: 0})

    const {firstName, lastName, image, hovered, selectedColor} = profileDetails

    const fileInputRef = useRef(null)

    const handleChange = (key, value) => {
        setProfileDetails((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const validateProfile = () => {
        if (!firstName) {
            toast.error("First Name is required")
            return false
        }
        if (!lastName) {
            toast.error("Last Name is required")
            return false
        }
        return true
    }

    const saveChanges = async() => {
        if (!validateProfile()) {
            return false
        }

        try {
            const response = await apiClient.post(UPDATE_PROFILE_ROUTE, {
                firstName,
                lastName,
                color: String(selectedColor)
            }, {withCredentials: true})

            if (response.status === 200 && response.data) {
                setUserInfo(response.data)
                console.log("User-info : ", userInfo, userInfo.email)
                console.log("response.data: line 58 ", response.data)

                toast.success("Profile update Successfully")
                navigate("/chat")
            }
        } catch (error) {}
    }

    const handleNavigate = () => {
        if (userInfo.profileSetup) {
            navigate("/chat")
        } else {
            toast.error("Please setup profile.")
        }
    }

    useEffect(() => {
        if (userInfo.profileSetup) {
            setProfileDetails((prev) => ({
                ...prev,
                "firstName": userInfo.firstName,
                "lastName": userInfo.lastName,
                "selectedColor": userInfo.color
            }))
        }
    }, [userInfo])

    const handleFileInputCLick = () => {
        fileInputRef
            .current
            .click()
    }

    const handleImageChange = async(e) => {
      const file = e.target.files[0]
      if(file){
        const formData = new FormData()
        formData.append("profile-image",file)

        const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData,{withCredentials : true})

        if(response.status === 200 && response.data.image){
          setUserInfo({...userInfo, image : response.data.image})
          toast.success("Image updated successfully")
        }

        const reader = new FileReader()

        reader.onload = () =>{
          handleChange("image" , reader.result)
        }
        reader.readAsDataURL(file);
      }
    }

    const handleDeleteImage = async(e) => {}
    return (
        <div
            className="bg-[#1b1c24] h-[100vh] items-center flex justify-center flex-col gap-10">
            <div className="flex flex-col gap-10 w-[80vw] md:w-max">
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                    <IoArrowBack
                        onClick={handleNavigate}
                        className="text-4xl lg:text-5xl text-white/90 cursor-pointer"/>
                </div>
                <div className="grid grid-cols-2">
                    <div
                        className="h-full w-32 md:w-48 md:h-48 flex items-center justify-center relative"
                        onMouseEnter={() => handleChange("hovered", true)}
                        onMouseLeave={() => handleChange("hovered", false)}>
                        <Avatar className="h-32 w-32 md:w-58 md:h-48 rounded-full overflow-hidden">
                            {image
                                ? <AvatarImage
                                        src={image}
                                        alt="profile"
                                        className="object-cover w-full h-full bg-black"/>
                                : <div
                                    className={`uppercase h-32 w-32 md-w-48 md:h-38 text-5xl border-[1px] flex items-center justify-center rounded-full text-white ${getColor(selectedColor)}`}>
                                    {firstName
                                        ? firstName
                                            .split("")
                                            .shift()
                                        : userInfo
                                            .email
                                            .split("")
                                            .shift()
}

                                </div>
}
                        </Avatar>
                        {hovered && (
                            <div
                                className=" absolute top-0 h-32 w-32 md-w-48 md:h-38 flex items-center justify-center bg-black/50 rounded-full cursor-pointer"
                                onClick={image ? handleDeleteImage : handleFileInputCLick }>
                                {image
                                    ? <FaTrash className="text-white text-xl " />
                                    : <FaPlus className="text-white text-xl" />
}
                            </div>
                        )
}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleImageChange}
                            name="profile-image"
                            accept=".png,.jpg,.jpeg,.svg,.webp"/>
                    </div>
                    <div
                        className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
                        <div className="w-full">
                            <Input
                                placeholder="Email"
                                type="email"
                                disabled
                                value={userInfo.email}
                                className="rounded-lg p-6 bg-[#2c2e3b] border-none"></Input>
                        </div>

                        <div className="w-full">
                            <Input
                                placeholder="First Name"
                                type="text"
                                onChange=
                                {(e)=>handleChange("firstName", e.target.value)}
                                value={firstName}
                                className="rounded-lg p-6 bg-[#2c2e3b] border-none"></Input>
                        </div>

                        <div className="w-full">
                            <Input
                                placeholder="Last Name"
                                type="text"
                                onChange=
                                {(e)=>handleChange("lastName", e.target.value)}
                                value={lastName}
                                className="rounded-lg p-6 bg-[#2c2e3b] border-none"></Input>
                        </div>

                        <div className="w-full flex gap-5 ">
                            {colors.map((color, index) => (
                                <div
                                    key={index}
                                    className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${selectedColor === index
                                    ? "outline outline-white outline-2"
                                    : ""}`}
                                    onClick={() => handleChange("selectedColor", index)}></div>
                            ))
}
                        </div>

                    </div>

                </div>
                <div className="w-full">
                    <Button
                        className={`h-16 w-full ${getColor(selectedColor)} hover:bg-transparent transition-all duration-300`}
                        onClick={saveChanges}>Save Changes</Button>
                </div>
            </div>
        </div>
    )
}
