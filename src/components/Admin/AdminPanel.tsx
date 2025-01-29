"use client"

import React from "react"

import NewUserDialog from "../NewUserDialog.tsx"
import UserTable from "./UserTable.tsx"
import type { User } from "@/types/User.tsx"
import { API_DOMAIN } from "../../../config.ts"
import { DDL } from "@/utils/DDL.ts"
import {columns } from "./UserColumn.tsx"


export default function AdminPanel() {
    
    const [users, setUsers] = React.useState<User[]>([])
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)

    React.useEffect(() => {
        DDL.GetUsers((users) => {
            setUsers(users)
            setIsLoggedIn(true)
        })
    }, [])

    function handleNewUserTokenRequest(email: string, accessLevel: number) {
        console.log("Requesting new user token for email: ", email, " with access level: ", accessLevel)
    }

    return <>
        {isLoggedIn && <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="flex flex-row justify-between w-full px-28">
                <h1 className="text-4xl">Admin Panel</h1>
                <NewUserDialog onSubmitToken={handleNewUserTokenRequest}/>
            </div>
            <UserTable columns={columns} data={users}/>

        </div>}
        {!isLoggedIn && <div className="flex flex-col items-center text-black justify-center">
            <h1 className="text-black">You are not logged in. </h1>
            <a href="/login">Login</a>
        </div>}
    </>
}