// /* eslint-disable @typescript-eslint/no-unused-vars */
// import type { ContentItem, ContentType } from "../types/ContentItem"
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

// }
