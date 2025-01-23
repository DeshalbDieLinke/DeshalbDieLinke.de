import React from "react"
import AltertDiv from "./AltertDiv"

export default function Login() {
    const [error, setError] = React.useState("")
    const [showAlert, setShowAlert] = React.useState(false)

    function handleSubmit(e: any) { 
        e.preventDefault()

        const form = e.target
        const formdata = new FormData(form)
        var email = formdata.get("email")
        var password = formdata.get("password")

        fetch("https://api.deshalbdielinke.de/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": window.localStorage.getItem("token") || ""
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res => {
            if (res.status === 200) {
                res.json().then(json => {

                    // The server does not send a token if the login was done with a token 
                    // Therefore, we only set the token if it is present in the response
                    if (json.token !== undefined) {
                    window.localStorage.setItem("token", json.token) }

                    window.location.href = "/profile"
                })
            } else {
                setError("Login failed")
                setShowAlert(true)
            }
        }).catch(err => {
            setError("An error occurred")
            setShowAlert(true)
        })
    }

    // Optionally hide the alert after a timeout
    React.useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 5000)
            return () => clearTimeout(timer)
        }
    }, [showAlert])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Login</h1>
            <form action="" onSubmit={handleSubmit}>
                <input required type="email" name="email" id="email" placeholder="email" />
                <input type="password" name="password" id="password" placeholder="Password" />
                <input type="submit" value="Login" />
            </form>
            <p>Don't have an account? <a href="/register">Register</a></p>
            { showAlert && <AltertDiv message={error} severiy={"error"} /> }
        </div>
    )
}
