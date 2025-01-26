import { useAppStore } from "@/store/store";
import React, { useState } from "react";

export default function Profile() {

  const {userInfo} = useAppStore()
  const [profileDetails, setProfileDetails] = useState({
    firstName : "",
    lastName : "",
    image : null,
    selectedColor : "",
  })
  return <div>Profile
    <div>Email : {userInfo.email}</div>
  </div>;
}
