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
        var token = formdata.get("token")

        fetch("https://api.deshalbdielinke.de/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                token: token
            })
        }).then(res => {
            if (res.status === 200) {
                res.json().then(json => {
                    window.localStorage.setItem("token", json.token)
                    window.location.href = "/"
                })
                setError("REGISTRATION SUCCESSFUL")
                setShowAlert(true)
            } else {
                // Extract error message 
                res.json().then(json => {
                    setError("oops: " + json.error)
                    setShowAlert(true)
                }).catch(err => {
                    setError("An error occurred")
                    setShowAlert(true)
                })
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
            <h1>Register</h1>
            <form action="" onSubmit={handleSubmit} className="[&>*]:mx-8">
                <input required type="email" name="email" id="email" placeholder="email" />
                <input required type="password" name="password" id="password" placeholder="Password"  />
                <input required type="text" name="token" id="token" placeholder="token"  />
                <input type="submit" value="Register" />
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>

            { showAlert && <AltertDiv message={error} severiy={"error"} /> }
        </div>
    )
}
