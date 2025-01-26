import {type ContentItem} from "@/types/ContentItem"
import type { User } from "@/types/User"
import { API_DOMAIN } from "config"
import React, { useState } from "react"
import NewContentDisplay from "./NewContentDisplay"
import {DDL } from "@/utils/DDL"


export default function Profile() {
    var [profileOwner, setProfileOwner] = useState<User | null>(null)
    var [loggedIn, setLoggedIn] = useState(false)
    var [contentItems, setContentItems] = useState<ContentItem[]>([])

    React.useEffect(() => {
        var queryParams = window.location.search
        var userID = parseInt(queryParams.split("id=")[1])
        if (userID) {
            //TODO check if the profile exists and get its data
            GetAuthorOwnedItems(setContentItems, userID)
            setProfileOwner({ID: userID})
        }
    }, [])
    function LogOut() {
        console.log("Not implemented")
    }

    return <>
        <div className="flex flex-col items-center justify-center h-screen">
            <div>
                <h1>Profile: {profileOwner ? profileOwner.ID : "Noone"}</h1> 
                <p className="text-lg">Welcome to your profile page</p>
                <a onClick={LogOut}>Logout</a>
                <a href="/upload">Upload new Content</a>
            </div>
            <NewContentDisplay contentItems={contentItems} />
        </div>
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
   

    // fetch(`${API_DOMAIN}/content?author=${AuthorID}`,{
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     credentials: "include"
    // }).then(res => {
    //     if (res.ok) {
    //         res.json().then(json => {
    //             const contentList: ContentItem[] = json.map((item: any) => { 
    //                 const topics = item.Topics ? JSON.parse(item.Topics) : [];
    //                 return ({
    //                     ID: item.ID,
    //                     title: item.Title,
    //                     type: "image",
    //                     text: item.Text,
    //                     imageUrl: item.Uri,
    //                     topics: topics,
    //                     official: item.Official,
                        
    //                 });
    //             });

    //             setContentItems(contentList)
    //         })}})}
            
}