import React from "react"
import AltertDiv from "./AltertDiv"

import { API_DOMAIN } from "config"
import { DDL } from "@/lib/DDL"

export default function Login() {
    const queryParams = new URLSearchParams(window.location.search)

    const redirectLocation = queryParams.get("redirect")

    console.log(redirectLocation)

    const [error, setError] = React.useState("")
    const [showAlert, setShowAlert] = React.useState(false)

    function handleSubmit(e: any) { 
        e.preventDefault()

        const form = e.target
        const formdata = new FormData(form)
        var email = formdata.get("email")
        var password = formdata.get("password")

        DDL.Login(email as string, password as string,
        // Accepted & Resolved
        () => {
            window.location.href = "/" + (redirectLocation || "profile")
        },
        // Rejected
        () => {
            setError("Login failed")
            setShowAlert(true) },
        // Error
        (err) => {
                setError("Login failed: " + err)
                setShowAlert(true)
            }
        ) 
    }

    // Optionally hide the alert after a timeout
    React.useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 5000)
            return () => clearTimeout(timer)
        }
    }, [showAlert])

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto rounded-none" src="/images/logos/DDL-Logo.svg" alt="Deshalb Die Linke Logo"/>
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Bei deinem Konto anmelden</h2>
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
                        <button type="submit" className="flex w-full justify-center rounded-md bg-[var(--primary)] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">Anmelden</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Noch keinen Account?
                    <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">Registrieren</a>
                </p>
            </div>
        </div>

)
}
