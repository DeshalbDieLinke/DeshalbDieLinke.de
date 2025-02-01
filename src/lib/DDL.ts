import type { ContentItem } from "@/types/ContentItem"
import type { User } from "@/types/User"
import type { string } from "astro:schema"
import { API_DOMAIN } from "config"


export namespace DDL {
    /**
     * Represents a ContentItem Search.
     * @property author - The ID of the author of the content.
     * @property topic - The topic of the content.
     * @property id - The ID of the content.
     * @property search - A search string to search for in the content.
    */
    export interface ContentSearchQuery {
        author?: number,
        topic?: string,
        id?: number,
        search?: string
    }
    
    /**
     * Fetches the authentication status of the user.
     * 
     * @param onSuccess - Callback function to be called when the request is successful. 
     *                    Receives a `User` object if authenticated, or `null` if not.
     * @param onRejected - Optional callback function to be called when the request is rejected (e.g., status 401).
     * @param onError - Optional callback function to be called when an error occurs during the request.
     */
    export function getAuthStatus(onSuccess: (user: User) => void, onRejected?: () => void, onError?: (err: Error) => void) {
            fetch(API_DOMAIN + "/auth/check", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                }).then(res => {
                    if (res.status === 401) {
                        if (onRejected) 
                        onRejected()
                    } else if (res.status === 200) {
                        res.json().then(json => {
                            const user: User = { 
                                Email: json.email,
                                ID: json.id,
                                AccessLevel: json.accessLevel
                            }
                            if (onSuccess) {
                                onSuccess(user)
                            }
                        })
                    }
                }).catch(err => { 
                    if (onError) {
                        onError(err)
                    }
                })
    }

    export function GetNewUserToken(email: string, accessLevel: number, onSuccess: (token: string) => void, onRejected?: () => void, onError?: (err: Error) => void) {
        fetch(API_DOMAIN + "/auth/new-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                email: email,
                accessLevel: accessLevel
            })
        }).then(res => {
            if (res.ok) {
                res.json().then(json => {
                    onSuccess(json.token)
                })
            }   }
        ).catch(err => {
            if (onError) {
                onError(err)
            }})
        
    }

    /**
     * Fetches the Content from the server. Query Params are passed as a URLSearchParams object. 
     * 
     * @param onSuccess - Callback function to be called when the request is successful. 
     *                    Receives a `contentItems` object (Contentitem[]).
     * @param onRejected - Optional callback function to be called when the request is rejected (e.g., status 401).
     * @param onError - Optional callback function to be called when an error occurs during the request.
     * @param searchQuery - Optional object containing search parameters.
     */
    export function GetContentItems(onSuccess: (contenItems: ContentItem[]) => void, onRejected?: () => void, onError?: (err: Error) => void, searchQuery?: ContentSearchQuery) {
        var url = API_DOMAIN + "/content"
        // Parsr the search query object into a URLSearchParams object
        if (searchQuery) {
            if (searchQuery.author) { 
                url += "?author=" + searchQuery.author
            }
            if (searchQuery.topic) {
                url += "?topic=" + searchQuery.topic
            }
            if (searchQuery.id) {
                url += "?id=" + searchQuery.id
            }
            if (searchQuery.search) {
                url += "?search=" + searchQuery.search
            }
        }
        fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            }).then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        console.log(json)
                        if (onSuccess) {
                            if (json.length == 0) {
                                onSuccess([])
                            }
                            const contentItems: ContentItem[] = json.map((item: any) => ParseToContentItem(item))
                            console.log(contentItems)
                            // Map the JSON response to ContentItem objects
                            onSuccess(contentItems)
                        }
                    })
                } else {
                    if (onRejected) 
                    onRejected()
                }
            }).catch(err => { 
                if (onError) {
                    onError(err)
                }
            })
    }
    export type UserUpdateRequest = {
        ID: number,
        Email?: string,
        AccessLevel?: number,
        Username?: string,
        Password: string
    }
    export function UpdateUser(updateRequest: UserUpdateRequest, onSuccess: () => void, onRejected?: () => void, onError?: (err: Error) => void) {
        if (!updateRequest.Password) {
            if (onError) {
            onError(new Error("Password is required")) }
            return
        }

        console.log(JSON.stringify(updateRequest))
        fetch(API_DOMAIN + "/auth/update-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(updateRequest)
        }).then(res => {
            if (res.ok) {
                onSuccess()
            } else {
                if (onRejected) 
                onRejected()
            }
        }).catch(err => {
            if (onError) {
                onError(err)
            }
        })
    }

    export function Logout(onSuccess: () => void, onError?: (err: Error) => void) {
        fetch(API_DOMAIN + "/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        }).then(res => {
            if (res.ok) {
                onSuccess()
            } 
        }).catch(err => {
            if (onError) {
                onError(err)
            }})
    }

    export function Login(email: string, password: string, onSuccess: () => void, onRejected?: () => void, onError?: (err: Error) => void) {
        
        fetch(API_DOMAIN + "/login", {
                    credentials: "include",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }).then(res => {
                    if (res.ok) {
                        onSuccess()
                    } else {
                        if (onRejected) 
                        onRejected()
                    }
                }).catch(err => {
                    if (onError) {
                        onError(err)
                    }
                })
    }

    export function GetUsers(onSuccess: (users: User[]) => void, onRejected?: () => void, onError?: (err: Error) => void, searchQuery?: ContentSearchQuery) {
        fetch( API_DOMAIN +"/auth/users",
            {
                credentials: "include",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }}).then(
            res =>  {
                if (res.status == 401) {
                    if (onRejected)
                    onRejected()
                }
                else if (res.ok) {
                    res.json().then(json=> {
                        const users = (json.users)
                        onSuccess(users)
                    }).catch(err => {
                        if (onError)
                        onError(err)
                    })
                }
            }
        ).catch(err => {
            if (onError)
            onError(err)
        }) }


    export interface Topic {
        key: number;
        name: string;
    }

    export function GetTopics(onSuccess: (topics: Topic[]) => void, onRejected?: () => void, onError?: (err: Error) => void) {
        fetch(API_DOMAIN + "/topics", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            }).then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        if (onSuccess) {
                            const topics: Topic[] = json.topics;
                            onSuccess(topics);
                        }
                    })
                } else {
                    if (onRejected) 
                    onRejected()
                }
            }).catch(err => { 
                if (onError) {
                    onError(err)
                }
            })
    }




    export function ParseToContentItem(item: any): ContentItem {
        const topics = item.Topics ? JSON.parse(item.Topics) : [];

        console.log(item)
        const ID = item.ID
        const title = item.Title
        const type = item.Type || "image"
        const altText = item.AltText 
        const description = item.Description
        const uri = item.Uri 
        const official = item.Official

        const contentItem: ContentItem = {
            id: ID,
            title: title,
            type: type,
            altText: altText,
            description: description,
            url: uri,
            topics: topics,
            official: official
        }
        return contentItem

    }

    export function DeleteUser(ID: number, arg1: () => void) {
        throw new Error("Function not implemented.")
    }
}
