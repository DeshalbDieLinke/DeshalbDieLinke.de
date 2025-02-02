import React from "react"
import AltertDiv from "./AltertDiv"
import { API_DOMAIN } from "config"

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

        fetch(API_DOMAIN + "/register", {

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
            if (res.ok) {
                res.json().then(json => {
                    window.localStorage.setItem("token", json.token)
                    window.location.href = "/login"
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
        // <div className="flex flex-col items-center justify-center h-screen">
        //     <h1>Register</h1>
        //     <form action="" onSubmit={handleSubmit} className="[&>*]:mx-8">
        //         <input required type="email" name="email" id="email" placeholder="email" />
        //         <input required type="password" name="password" id="password" placeholder="Password"  />
        //         <input required type="text" name="token" id="token" placeholder="token"  />
        //         <input type="submit" value="Register" />
        //     </form>
        //     <p>Already have an account? <a href="/login">Login</a></p>
        //
        //     { showAlert && <AltertDiv message={error} severiy={"error"} /> }
        // </div>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto rounded-none" src="/images/logos/DDL-Logo.svg" alt="Deshalb Die Linke Logo"/>
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Neues Konto anlegen</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email</label>
                    <div className="mt-2">
                        <input type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Passwort</label>
                        <div className="text-sm">
                            {/*<a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>*/}
                        </div>
                    </div>
                    <div className="mt-2">
                        <input type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Access Token</label>
                        <div className="text-sm">
                            <a href="mailto:demohstens@gmail.com" className="font-semibold text-indigo-600 hover:text-indigo-500">Noch keinen Token?</a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input type="token" name="token" id="token" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-[var(--primary)] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registrieren</button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
                Du hast schon ein Konto bei uns?
                <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Anmelden</a>
            </p>
        </div>
    </div>
    )
}
