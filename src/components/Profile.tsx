import { useState } from "react"


export default function Profile() {
    var [email, setEmail] = useState("")
    var [loggedIn, setLoggedIn] = useState(false)
    fetch("https://api.deshalbdielinke.de/auth/check", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": window.localStorage.getItem("token") || ""
        }
    }).then(res => {
        if (res.status === 401) {
            setEmail("")
        } else if (res.status === 200) {
            setLoggedIn(true)
            res.json().then(json => {
                setEmail(json.email)
            })
        }
    })
    


    return <>
        <div className="flex flex-col items-center justify-center h-screen">
            {loggedIn ? <h1>Profile: {email}</h1> : <h1>Not logged in. <a href="/login"> login</a></h1>}
            <p className="text-lg">Welcome to your profile page</p>
        </div>
        </>
}