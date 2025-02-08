// /* eslint-disable @typescript-eslint/no-unused-vars */
// import type { ContentItem, ContentType } from "../types/ContentItem"
// import type { User } from "../types/User"
// import { API_DOMAIN } from "../../config"

// // eslint-disable-next-line @typescript-eslint/no-namespace
// export namespace DDL {
//     /**
//      * Represents a ContentItem Search.
//      * @property author - The ID of the author of the content.
//      * @property topic - The topic of the content.
//      * @property id - The ID of the content.
//      * @property search - A search string to search for in the content.
//     */
//     export interface ContentSearchQuery {
//         author?: number,
//         topic?: string,
//         id?: number,
//         search?: string
//     }
    
//     /**
//      * Fetches the authentication status of the user.
//      * 
//      * @param onSuccess - Callback function to be called when the request is successful. 
//      *                    Receives a `User` object if authenticated, or `null` if not.
//      * @param onRejected - Optional callback function to be called when the request is rejected (e.g., status 401).
//      * @param onError - Optional callback function to be called when an error occurs during the request.
//      */
//     export const GetAuthStatus = async (onSuccess: (user: User) => void, onRejected?: () => void, onError?: (err: Error) => void) => 
//         {
//             try {
//                 const res = await fetch(API_DOMAIN + "/auth/check", {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     credentials: "include"
//                 })
            
//             if (res.status === 401) {
//                         if (onRejected) 
//                         onRejected()
//             } else if (res.ok) {
//                         res.json().then(json => {
//                             if (onSuccess) {
//                                 console.log("JSON", json)
//                                 const user: User = { 
//                                     ID: json.id,
//                                     Email: json.email,
//                                     AccessLevel: json.accessLevel,
//                                     Username: json.username
//                                 };
//                                 onSuccess(user)
//                             }
//                         })
//                     }
//                 } catch(err) { 
//                     if (onError) {
//                         onError(err as Error)
//                 } } }


//     export function GetNewUserToken(email: string, accessLevel: number, onSuccess: (token: string) => void, onRejected?: () => void, onError?: (err: Error) => void) {
//         fetch(API_DOMAIN + "/auth/new-user", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             credentials: "include",
//             body: JSON.stringify({
//                 email: email,
//                 accessLevel: accessLevel
//             })
//         }).then(res => {
//             if (res.ok) {
//                 res.json().then(json => {
//                     onSuccess(json.token)
//                 })
//             }   }
//         ).catch(err => {
//             if (onError) {
//                 onError(err)
//             }})
        
//     }

//     /**
//      * Fetches the Content from the server. Query Params are passed as a URLSearchParams object. 
//      * 
//      * @param onSuccess - Callback function to be called when the request is successful. 
//      *                    Receives a `contentItems` object (Contentitem[]).
//      * @param onRejected - Optional callback function to be called when the request is rejected (e.g., status 401).
//      * @param onError - Optional callback function to be called when an error occurs during the request.
//      * @param searchQuery - Optional object containing search parameters.
//      */
//     export function GetContentItems(onSuccess: (contenItems: ContentItem[]) => void,  searchQuery?: DDL.ContentSearchQuery, onFailure?: (err: Error) => void) {
//         let url = API_DOMAIN + "/content"
//         // Parsr the search query object into a URLSearchParams object
//         if (searchQuery) {
//             if (searchQuery.author != undefined) { 
//                 url += "?author=" + searchQuery.author
//             }
//             if (searchQuery.topic  != undefined) {
//                 url += "?topic=" + searchQuery.topic
//             }
//             if (searchQuery.id != undefined) {
//                 url += "?id=" + searchQuery.id 
//             }
//             if (searchQuery.search  != undefined) {
//                 url += "?search=" + searchQuery.search
//             }
//         }
//         fetch(url, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 credentials: "include"
//             }).then(res => {
//                 if (res.ok) {
//                     res.json().then(json => {
//                         if (onSuccess) {
//                             if (json.length == 0) {
//                                 onSuccess([])
//                             }
//                             const contentItems: ContentItem[] = json.map((item: ContentItem) => ParseToContentItem(item))
//                             // Map the JSON response to ContentItem objects
//                             onSuccess(contentItems)
//                         }
//                     })
//                 } else {
//                     if (onFailure) 
//                     onFailure(new Error("Request rejected."))
//                 }
//             }).catch(err => { 
//                 if (onFailure) {
//                     onFailure(err)
//                 }
//             })
//     }
//     export type UserUpdateRequest = {
//         id: number,
//         email?: string,
//         accessLevel?: number,
//         username?: string,
//         password: string
//     }
//     export function UpdateUser(updateRequest: UserUpdateRequest, onSuccess: () => void, onRejected?: () => void, onError?: (err: Error) => void) {
//         if (updateRequest.password == undefined) {
//             if (onError) {
//             onError(new Error("Password is required")) }
//             return
//         }
//         fetch(API_DOMAIN + "/auth/update-user", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             credentials: "include",
//             body: JSON.stringify({
//                 id: Number(updateRequest.id),  
//                 email: updateRequest.email,
//                 accessLevel: Number(updateRequest.accessLevel),  
//                 username: updateRequest.username,
//                 password: updateRequest.password
//             })
//         }).then(res => {
//             if (res.ok) {
//                 onSuccess()
//             } else {
//                 if (onRejected) 
//                 onRejected()
//             }
//         }).catch(err => {
//             if (onError) {
//                 onError(err)
//             }
//         })
//     }
//     export type ContentItemUpdate = {
//         id: number,
//         title: string,
//         description: string,
//         altText: string,
//         official: boolean,
//         topics: string,
//         type: ContentType,
//         url: string,
//     }


//     export function UpdateContentItem(formData: FormData, onSuccess: () => void, onFailure?: (err: Error) => void) {
//         const request = API_DOMAIN + "/auth/update-content" + "?id=" + formData.get("id")
//         console.log("Formdata again:", formData.get("title"))
//         fetch(request, {
//             method: "POST",
//             credentials: "include",
//             body: formData
//         }).then(res => {
//             if (res.ok) {
//                 onSuccess()
//             } else {
//                 if (onFailure) 
//                 onFailure(new Error("Request rejected."))
//             }
//         }).catch(err => {
//             if (onFailure) {
//                 onFailure(err)
//             }
//         })
//     }

//     export function Logout(onSuccess: () => void, onError?: (err: Error) => void) {
//         fetch(API_DOMAIN + "/logout", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             credentials: "include"
//         }).then(res => {
//             if (res.ok) {
//                 onSuccess()
//             } 
//         }).catch(err => {
//             if (onError) {
//                 onError(err)
//             }})
//     }

//     export function Login(email: string, password: string, onSuccess: () => void, onRejected?: () => void, onError?: (err: Error) => void) {
        
//         fetch(API_DOMAIN + "/login", {
//                     credentials: "include",
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         email: email,
//                         password: password
//                     })
//                 }).then(res => {
//                     if (res.ok) {
//                         onSuccess()
//                     } else {
//                         if (onRejected) 
//                         onRejected()
//                     }
//                 }).catch(err => {
//                     if (onError) {
//                         onError(err)
//                     }
//                 })
//     }

//     export function GetUsers(onSuccess: (users: User[]) => void, onRejected?: () => void, onError?: (err: Error) => void, searchQuery?: DDL.ContentSearchQuery) {
//         fetch( API_DOMAIN +"/auth/users",
//             {
//                 credentials: "include",
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 }}).then(
//             res =>  {
//                 if (res.status == 401) {
//                     if (onRejected)
//                     onRejected()
//                 }
//                 else if (res.ok) {
//                     res.json().then(json=> {
//                         const users = (json.users)
//                         onSuccess(users)
//                     }).catch(err => {
//                         if (onError)
//                         onError(err)
//                     })
//                 }
//             }
//         ).catch(err => {
//             if (onError)
//             onError(err)
//         }) }


//     export interface Topic {
//         key: number;
//         name: string;
//     }

//     // export function GetTopics(onSuccess: (topics: Topic[]) => void, onRejected?: () => void, onError?: (err: Error) => void) {
//     //     fetch(API_DOMAIN + "/topics", {
//     //             method: "GET",
//     //             headers: {
//     //                 "Content-Type": "application/json",
//     //             },
//     //             credentials: "include"
//     //         }).then(res => {
//     //             if (res.ok) {
//     //                 res.json().then(json => {
//     //                     if (onSuccess) {
//     //                         const topics: Topic[] = json.topics;
//     //                         onSuccess(topics);
//     //                     }
//     //                 })
//     //             } else {
//     //                 if (onRejected) 
//     //                 onRejected()
//     //             }
//     //         }).catch(err => { 
//     //             if (onError) {
//     //                 onError(err)
//     //             }
//     //         })
//     // }




//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     export function ParseToContentItem(item: any): ContentItem {
//         let topics: string[];
//         try {
//             topics = item.Topics ? JSON.parse(item.Topics) : []; }
//         catch (err) {
//             topics = item.Topics || [];
//         }

//         console.log(item)
//         const ID = item.id
//         const title = item.Title
//         const type = item.Type || "image"
//         const altText = item.AltText 
//         const description = item.Description
//         const uri = item.Uri 
//         const official = item.Official
//         const broken = item.Broken
//         const authorID = item.AuthorClerkID || item.AuthorID

//         console.log(authorID)

//         const contentItem: ContentItem = {
//             id: ID,
//             title: title,
//             type: type,
//             altText: altText,
//             description: description,
//             url: uri,
//             topics: topics,
//             official: official,
//             broken: broken,
//             autherID: authorID
//         }
//         return contentItem

//     }

//     export function DeleteUser(ID: number, arg1: () => void) {
//         throw new Error("Function not implemented.")
//     }

//     export function DeleteContentItem(ID: number, onSuccess?: () => void, onFailure?: (err: Error) => unknown) {
//         if (ID) {
//             fetch(
//                 API_DOMAIN + "/content/delete?id=" + ID,
//                 {
//                     credentials: "include",
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     }
//                 }).then(res => {
//                     if (res.ok) {
//                         if (onSuccess) {
//                             onSuccess()
//                         }
//                     } else {
//                         if (onFailure) {
//                             onFailure(new Error("Request rejected."))
//                         }
//                     }
//                 }).catch(err => {
//                     if (onFailure) {
//                         onFailure(err)
//                     }
//                 })
//         } else {
//             if (onFailure) {
//                 onFailure(new Error("No Content ID provided."))
//             }
//         }
//     }

//     export function GetUser( onSuccess: (user: User) => void, userID?: number, onFailure?: () => void, onError?: (err: Error) => void) {
//         fetch(
//                 API_DOMAIN + "/profile" + (userID ? "?id=" + userID : ""),
//                 {
//                     credentials: "include",
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                     }
//                 }).then(res => {
//                     if (res.ok) {
//                         res.json().then(json => {
//                             const user: User = {
//                                 Username: json.username,
//                                 ID: userID ? userID : json.id,
//                                 AccessLevel: json.accessLevel
//                             }
//                             if (onSuccess) {
//                                 onSuccess(user)
//                             }
//                         })
//                     } else {
//                         if (onFailure) 
//                         onFailure()
//                     }
//                 }).catch(err => {
//                     if (onError) 
//                     onError(err)
//                 })
        
//     }

// }
