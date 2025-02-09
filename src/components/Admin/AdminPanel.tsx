"use client"

import React from "react"
import TransferContent from "./ContentTransfer"

// import NewUserDialog from "../NewUserDialog.tsx"
// import UserTable from "./UserTable.tsx"
// import {columns } from "./UserColumn.tsx"

export default function AdminPanel() {
    
    // function handleNewUserTokenRequest(email: string, accessLevel: number) {
    //     console.log("Requesting new user token for email: ", email, " with access level: ", accessLevel)
    // }

    return <>
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="flex flex-row justify-between w-full px-28">
                <h1 className="text-4xl">Admin Panel</h1>
                {/* <NewUserDialog onSubmitToken={handleNewUserTokenRequest}/> */}
            </div>
            {/* <UserTable columns={columns} data={[]}/> */}
            <TransferContent />

        </div>
    </>
}