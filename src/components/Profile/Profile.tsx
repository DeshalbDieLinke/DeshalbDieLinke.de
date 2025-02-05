// import {type ContentItem} from "@/types/ContentItem.ts"
// import type {User} from "@/types/User.tsx"
// import React, {useState} from "react"
// import NewContentDisplay from "../NewContentDisplay.tsx"
// import {DDL} from "@/lib/DDL.ts"


// export default function Profile() {
//     const [profileOwner, setProfileOwner] = useState<User | null>(null)
//     const [isOwner, setIsOwner] = useState(false)
//     const [contentItems, setContentItems] = useState<ContentItem[]>([])

//     React.useEffect(() => {
//         const queryParams = window.location.search
//         const userID = parseInt(queryParams.split("id=")[1])
//         if (userID != undefined && !isNaN(userID) || userID == 0 || userID == null) {
//             DDL.GetUser(
//                 // Success
//                 (user) => {
//                 setProfileOwner(user)
//                 GetAuthorOwnedItems(setContentItems, user.ID)
//                 // TODO replace with Session 
//                 DDL.GetAuthStatus((user) => {
//                     setIsOwner(user.ID == userID)
//                 })
//             }, userID,
//             () => {
//                 setProfileOwner(null)
//             },
//             (err) => {
//                 console.error(err)
//                 setProfileOwner(null)
//             } )
        
//         } else {
//             DDL.GetAuthStatus( 
//                 // Success
//                 (user) => {
//                 setProfileOwner(user)
//                 setIsOwner(true)
//                 GetAuthorOwnedItems(setContentItems, user.ID)
//             } )
//         }

//             // setProfileOwner({
//             //     ID: 0,
//             //     Username: "Test",
//             //     Email: ""
//             // })
//             // setIsOwner(true)
//     }, [])
//     function LogOut() {
//         DDL.Logout(() => {
//             window.location.href = "/"
//         })}
    

//     return <>
//         {profileOwner ? <div className="flex flex-col items-center justify-center h-screen">
//             <div className="flex flex-col justify-center w-1/2 p-4 bg-gray-200 rounded-lg">
//                 <h1>{profileOwner.Username ? profileOwner.Username: "Diese*r Benutzer*In hat keinen username. Fordere die Person gerne auf, einen Einzurichten :)"}</h1>
//                 {isOwner && <div>
//                     <p className="text-lg">Welcome to your profile page</p>
//                     <div className="w-[50%] m-2">
//                         <a className="btn" onClick={LogOut}>Logout</a>
//                         <a className="btn m-2" href="/upload">Upload new Content</a>
//                         <EditUserDialog user={profileOwner}/>
//                     </div>
//                 </div>}
//             </div>
//             <NewContentDisplay contentItems={contentItems}/>
//         </div> : <div className="flex justify-center items-center flex-grow">
//             <p>404 Not Found</p></div>}
//         </>
// }


// function GetAuthorOwnedItems(setContentItems: (arg0: ContentItem[]) => void, authorID?: number) {

//     if (authorID) {
//         const SearchQuery: DDL.ContentSearchQuery = { 
//             author: authorID
//         }
//         DDL.GetContentItems((content) => {
//             setContentItems(content)
//         }, SearchQuery, (err) => console.error(err))
//     }
// }