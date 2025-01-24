import React from "react"

import NewUserDialog from "./NewUserDialog"


export default function AdminPanel() {
    token = ""
    var token = window.localStorage.getItem("token")
    const [users, setUsers] = React.useState([])
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)



    var userData = fetch("http://localhost:8080/auth/users",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":  token || ""
    }}).then(
        res =>  {
            if (res.status == 401) {
                // redirect to login
                location.href = "/login?redirect=admin"
            }
            else if (res.ok) {
                res.json().then(json=> {
                console.log(json)
                setIsLoggedIn(true)
                }).catch(err => {
                    console.error("Client error: ", err)
                })
            }
        }
    ).catch(err => {
        console.error(err)
    })

    function handleNewUserTokenRequest(email: String, accessLevel: Number) {
        
    }
    

    return <>
        {isLoggedIn && <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="flex flex-row justify-between w-full px-28">
            <h1 className="text-4xl">Admin Panel</h1> 
            <NewUserDialog onSubmitToken={handleNewUserTokenRequest}/>
            
            </div>
            <div className="flex flex-row justify-around">
                <div>
                    <h2>Users</h2>
                    <ol>

                    </ol>
                </div>
                <div>
                    <h2>Content</h2>
                    <ol>

                    </ol>
                </div>
            </div>
        </div>
        }
    </>
}