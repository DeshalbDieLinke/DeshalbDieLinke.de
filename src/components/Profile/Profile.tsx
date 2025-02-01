import {type ContentItem, ContentType} from "@/types/ContentItem.ts"
import type {User} from "@/types/User.tsx"
import React, {useState} from "react"
import NewContentDisplay from "../NewContentDisplay.tsx"
import {DDL} from "@/lib/DDL.ts"


export default function Profile() {
    var [profileOwner, setProfileOwner] = useState<User | null>(null)
    var [isOwner, setIsOwner] = useState(false)
    var [contentItems, setContentItems] = useState<ContentItem[]>([])

    React.useEffect(() => {
        var queryParams = window.location.search
        var userID = parseInt(queryParams.split("id=")[1])
        // if (userID) {
        //     //TODO check if the profile exists and get its data
        //     GetAuthorOwnedItems(setContentItems, userID)
        //
        // }
        // TESTING
        const profileUser : User = {
            ID: 1,
            Email: "email@example.com",
            Username: "Example1212",
            AccessLevel: 1,
        }
        setProfileOwner(profileUser)
        setIsOwner(true)
    }, [])
    function LogOut() {
        DDL.Logout(() => {
            window.location.href = "/"
        })}

    // TESTING
    contentItems = // Test
    [ {
        id: 1,
        autherID: 2,
        title: "Debug Item title",
        official: false,
        description: "debug",
        topics: ["topic1", "topic2"],
        type: ContentType.Image,
        url: "https://deshalbdielinke.de/images/sharepics/Arbeit%20und%20Inflation/Inflation.OFFIZIELL.png",
    }]


    return <>
        {profileOwner ? <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col justify-center w-1/2 p-4 bg-gray-200 rounded-lg">
                <h1>Profile: {profileOwner.Username?? "No username for "}</h1>
                {isOwner && <div>
                    <p className="text-lg">Welcome to your profile page</p>
                    <div className="w-[50%] m-2">
                        <a className="btn" onClick={LogOut}>Logout</a>
                        <a className="btn m-2" href="/upload">Upload new Content</a>
                    </div>
                </div>}
            </div>
            <NewContentDisplay contentItems={contentItems}/>
        </div> : <div className="flex justify-center items-center">404 Not Found</div>}
        </>
}


function GetAuthorOwnedItems(setContentItems: (arg0: ContentItem[]) => void, authorID?: number) {

    if (authorID) {
        const SearchQuery: DDL.ContentSearchQuery = { 
            author: authorID
        }
        DDL.GetContentItems((content) => {
            setContentItems(content)
        }, () => {}, (err) => console.error(err), SearchQuery)
    }
}