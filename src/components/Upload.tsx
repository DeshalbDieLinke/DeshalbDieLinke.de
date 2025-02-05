/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import React, { useEffect, useRef } from "react"
import Topics from "./Topics";
import { API_DOMAIN } from "../../config";
import { DDL } from "@/lib/DDL";
import { Protect, RedirectToSignIn, SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import useShowError from "./Error/setError";

export default function Upload() { 
    const [showAlert, setShowAlert] = React.useState(false)
    const [preview, setPreview] = React.useState<string | null>(null);
    const [selectedTops, setSelectedTops] = React.useState<string[]>([])

    const { has } = useAuth()

    function onFileAdded(e: any) { 
        const file = e.target.files?.[0]; // Access the first file (if any)
        
        if (file) {
            if (file.size > 1024 * 1024 * 10) {
                //TODO add proper error handling for large files
                e.target.value = ""; // Clear the input
                setPreview(null); // Clear the preview
                console.error("File is too large. Maximum size is 10MB.");
                return;
            }
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

    const { getToken } = useAuth()
    const setError = useShowError()

    async function handleSubmit(e: any) { 
        e.preventDefault()
        const form = e.target
        const formdata = new FormData(form)
        formdata.append("topics", JSON.stringify(selectedTops))
        fetch( API_DOMAIN + "/auth/upload", {
            method: "POST",
			headers: {
					"Authorization": `Bearer ${await getToken()}`,
			},
            credentials: "include",
            body: formdata
        }).then(res => {
            if (res.ok) {
                setError("Upload successful")
            } else {
                // Extract error message 
                res.json().then(json => {
                    setError(json.message)
                }).catch(err => {
                    setError("An error occurred", "success")
                    console.error(err)
                })
            }
        }).catch(err => {
            setError("A client error occurred")
            console.error(err)
        })
    }
    // Optionally hide the alert after a timeout


    return <>
        <div className="w-full h-min-[50vh] flex flex-col items-center justify-center">
            <SignedIn>
            <form action="" onSubmit={handleSubmit} className="h-min-[50vh] flex flex-col items-center justify-center [&>*]:m-2">

                {preview ? <img className="h-1/2" src={preview} alt="" width={500} height={500} /> : <div className="h-[40vh] w[50vw] bg-gray-200"></div>}
    
                <input required onChange={onFileAdded} type="file" name="file" id="file" accept="image/*" />
                <input required className="p-2 w-[20rem]"  type="text" name="title" id="title" placeholder="title" />
                <input className="p-2 w-[20rem]" type="text" name="description" id="description" placeholder="description" />
                {preview && <input className="p-2 w-[20rem]" type="text" name="altText" id="altText" placeholder="Alt-Text Bild" />}
                <div className="w-[20rem] flex justify-between">
                    <Topics SelectedTopicsCallback={setSelectedTops} />
                        <Protect role="org:admin">
                        <div className="flex flex-col items-center w-8">
                            <label className="text-[0.7rem]" htmlFor="official">Official</label>
                            <input  name="official" id="official" type="checkbox" />
                        </div>
                        </Protect>
                        
                   
                </div>
                

                <input className="btn btn-primary" type="submit" value="Upload" />

            </form>
            </SignedIn>
            <SignedOut>
                {/* <RedirectToSignIn /> */}
                </SignedOut>

        </div>
    </>

}