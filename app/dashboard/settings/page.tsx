'use client'
import { DashboardContext } from "@/context/DashboardContext"
import { useContext } from "react"


export default function Settings() {


    const { userData, setUserData } = useContext(DashboardContext)
    console.log("setting page got: ", userData)
return (
    <h1>
        {userData.name}
    </h1>
)
}
