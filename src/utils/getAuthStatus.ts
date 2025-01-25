import type { User } from "@/types/User"
import { API_DOMAIN } from "config"

export default function getAuthStatus(onSuccess: (user: User | null) => void, onRejected?: () => void, onError?: () => void) {
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
                    onError()
                }
            })
        }