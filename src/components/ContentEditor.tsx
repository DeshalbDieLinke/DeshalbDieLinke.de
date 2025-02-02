"use client"

import React, {useEffect} from "react"
import Topics from "./Topics";
import {API_DOMAIN} from "config";
import {DDL} from "@/lib/DDL";
import ContentItemComponent from "@/components/NewContentComponent.tsx";
import {type ContentItem, ContentType} from "@/types/ContentItem.ts";

export default function ContentEditor() {
    const [contentItem, setContentItem] = React.useState<ContentItem | null>(null)
    const [error, setError] = React.useState("")
    const [showAlert, setShowAlert] = React.useState(false)
    const [preview, setPreview] = React.useState<ContentItem | null>(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [accessLevel, setAccessLevel] = React.useState(3)
    const [selectedTops, setSelectedTops] = React.useState<string[]>([])


    useEffect(() => {
        const id = window.location.search.split("id=")[1]
        const searchQuery = {
            id: parseInt(id)
        }
        DDL.GetAuthStatus((user) => {
            setIsLoggedIn(true)
            setAccessLevel(user?.AccessLevel || 3)
        }, () => {
            console.log("Not logged in")
            setIsLoggedIn(false)
        }), (err: Error) => console.error(err)

        DDL.GetContentItems((items) => {
            const item = items[0]
            setContentItem(item)
            setSelectedTops(item.topics)
            setPreview(item.url ? item : null)
        },
        searchQuery,
        (err) => {
                console.error(err)
            })
    
    }, [])
    // Check if user is logged in
    fetch(API_DOMAIN + "/auth/check", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    }).then(res => {
        if (res.status === 401) {
            setIsLoggedIn(false)
        } else if (res.ok) {
            setIsLoggedIn(true)
            res.json().then(json => {
                setAccessLevel(json.accessLevel)
            })
        }
    })

    function onFileAdded(e: any) {
        console.log(e.target.files[0])
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
                const prewiewItem: ContentItem = {
                    id: 0,
                    title: "ADD TITLE",
                    url: previewURL,
                    topics: selectedTops,
                    official: false,
                    type: ContentType.Image,

                }
                setPreview(prewiewItem);
            } else {
                console.error("Selected file is not an image.");
            }
        } else {
            console.error("Selected file is not an image.");
        }
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        const form = e.target 
        const formdata = new FormData(form)
        if (!formdata.get("file") ) {
            if (!contentItem?.url) {
                setError("No file selected")
                setShowAlert(true)
                return
            } else {
                setError("No file selected, using existing file")
                setShowAlert(true)
                formdata.append("url", contentItem.url)

            }
        }

        formdata.append("topics", JSON.stringify(selectedTops))
        formdata.append("id", contentItem!.id.toString())

        console.log("Formdata:", formdata.get("title"))
        DDL.UpdateContentItem(formdata, () => {
            setError("Upload successful")
            location.reload()
            setShowAlert(true)
        }, (err) => {
            console.error(err)
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
        <div className="w-full h-full flex flex-col items-center justify-center">
            <form  onSubmit={handleSubmit} className="h-[80%] lg:w-[60%] flex flex-col items-center justify-center [&>*]:m-2 border p-8 border-black rounded-md">
                <div className="flex justify-around items-center max-h-full m-4">
                    <div className="form flex-shrink mr-20">
                        <div className=" ">
                            <input onChange={onFileAdded} type="file" name="file" id="file" accept="image/*"
                                defaultValue={contentItem?.url}/>
                        </div>
                        <div className="h-[30%] ">
                            <div className="flex flex-col">
                                <label className="text-sm">Titel</label>
                                <input required className="p-2 w-[20rem]" type="text" name="title" id="title" placeholder="title"
                                            defaultValue={contentItem?.title}/>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="description" className="text-sm">Beschreibung</label>
                                <input required className="p-2 w-[20rem]" type="text" name="description" id="description" placeholder="Beschreibung" defaultValue={contentItem?.description}/>
                            </div>
                            {preview &&
                                <div className="flex flex-col">
                                    <label className="text-sm">Alt Text</label>
                                    <input className="p-2 w-[20rem]" type="text" name="altText" id="altText" 
                                        placeholder="Alt-Text Bild" defaultValue={contentItem?.altText}/>
                                </div>}
                            <div className="w-[20rem] flex justify-between">
                                <Topics SelectedTopicsCallback={setSelectedTops}/>
                                {isLoggedIn && accessLevel < 2 && <div className="flex flex-col items-center w-8">
                                    <label className="text-[0.7rem]" htmlFor="official">Official</label>
                                    <input name="official" id="official" type="checkbox"
                                    defaultChecked={contentItem?.official}/>
                                </div>}
                            </div>
                        </div>
                    </div>
                <div className="grid h-full">
                    {preview &&<> <label className="text-lg">Vorschau:</label>
                        <ContentItemComponent item={preview} clickCallback={() =>{} } /> </>}
                </div>
            </div>
            <div className="flex justify-around items-center relative bottom-0 w-full">
                <input className="btn" type="submit" value="Bild Editieren"/>
                <input className="btn" type="button" value="Bild Löschen" 
                    onClick={() => DDL.DeleteContentItem(contentItem!.id, ()=>{
                        location.href = "/profile"
                    })}/>
                
            </div>

            </form>
        </div>
    </>

}

