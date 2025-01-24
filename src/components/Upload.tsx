import React from "react"

export default function Upload() { 
    const [error, setError] = React.useState("")
    const [showAlert, setShowAlert] = React.useState(false)
    const [preview, setPreview] = React.useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [accessLevel, setAccessLevel] = React.useState(3)
    
    // Check if user is logged in
    fetch("http://localhost:8080/auth/check", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": window.localStorage.getItem("token") || ""
        }
    }).then(res => {
        if (res.status === 401) {
            setIsLoggedIn(false)
        } else if (res.status === 200) {
            setIsLoggedIn(true)
            res.json().then(json => {
                setAccessLevel(json.accessLevel)
            })
        }
    })

    function onFileAdded(e: any) { 
        const file = e.target.files?.[0]; // Access the first file (if any)
        if (file) {
            console.log("Selected File:", file); // Debug: Ensure file exists
            if (file.type.startsWith("image/")) {
                const previewURL = URL.createObjectURL(file);
                console.log("Preview URL:", previewURL); // Debug: Check the generated URL
                setPreview(previewURL);
            } else {
                console.error("Selected file is not an image.");
            }
        }
    }

    function handleSubmit(e: any) { 
        e.preventDefault()
        const form = e.target
        const formdata = new FormData(form)

        fetch("http://localhost:8080/auth/upload", {
            method: "POST",
            headers: { 
                "Authorization": window.localStorage.getItem("token") || ""
            },
            body: formdata
        }).then(res => {
            if (res.ok) {
                setError("UPLOAD SUCCESSFUL")
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
            setError("A client error occurred")
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


    return <>
        <div className="w-full h-min-[50vh] flex flex-col items-center justify-center">
            {isLoggedIn && accessLevel < 3 && <form action="" onSubmit={handleSubmit} className="h-min-[50vh] flex flex-col items-center justify-center [&>*]:m-2">
                <img className="h-96" src={preview || ""} alt="" />
                <input required onChange={onFileAdded} type="file" name="file" id="file" accept="image/*" />
                <input required className="p-2 w-[20rem]"  type="text" name="title" id="title" placeholder="title" />
                <input className="p-2 h-[6rem] w-[20rem]" type="text" name="description" id="description" placeholder="description" />
                <div className="w-[20rem] flex justify-between">
                    <input required  className="w-full mr-4 ml-0" type="text" name="topics" id="topics" placeholder="topics ',' seperated" />
                    {isLoggedIn && accessLevel == 0 &&<div className="flex flex-col items-center w-8">
                        <label className="text-[0.7rem]" htmlFor="official">Official</label>
                        <input  name="official" id="official" type="checkbox" />
                    </div>}
                </div>

                <input className="btn" type="submit" value="Upload" />
            </form> }
            {isLoggedIn == false && <div className="flex flex-col items-center justify-center">
                <h1>You are not logged in. </h1>
                <a href="/login">Login</a>
                </div> 
            }
            {isLoggedIn && accessLevel > 2 && <div className="flex flex-col items-center justify-center">
                
                <h1>You are not authorized to upload content. </h1>
            </div>}
        </div>
        {showAlert && <div>{error}</div>}
    </>

}