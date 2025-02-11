/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Topics from "@/components/Topics";
import useShowError from "../Error/setError";
import React, { useRef, useState, useActionState, useEffect } from "react";
import { ContentItem } from "@/types/ContentItem";
import { Skeleton } from "../ui/skeleton";
import FileUpload from "./FileUpload";
import Image from "next/image";
import { UploadServer } from "./UploadServer";
import { useFormState, useFormStatus } from "react-dom";


interface Preview {
    url: string;
    type: string;
}

export default function UploadComponent() {
    const [selectedTops, setSelectedTops] = React.useState<string[]>([])
    const [preview, setPreview] = React.useState<Preview | null>(null);
    const showError = useShowError()

    const altInput = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);


    function onFileAdded(e: any) {
        e.preventDefault()
        console.log(e.target.files[0])
        const file = e.target.files?.[0]; // Access the first file (if any)

        if (file) {
            if (file.size > 1024 * 1024 * 20) {
                //TODO add proper error handling for large files
                e.target.value = ""; // Clear the input
                setPreview(null); // Clear the preview
                showError("File is too large. Maximum size is 20MB.", "warning");
                return;
            }
            console.log("Selected File:", file); // Debug: Ensure file exists
            if (file.type.startsWith("image/") || file.type.startsWith("video/") || file.type === "application/pdf" || file.type.startsWith("audio/")) {
                const previewURL = URL.createObjectURL(file);

                setPreview({url: previewURL, type: file.type});
                if ((file.type.startsWith("video/") || file.type.startsWith("application/pdf"))) { showError("Only image Uploads are supported properly.", "warning"); }
            } else {
                showError("Selected file is not an image.");
            }
        } else {
            showError("No File.", "error")
        }
    }
    
    function onImageClick(e: any) { 
        if (fileInputRef.current)
        fileInputRef.current.click()
    }
    
    // DEPRIECATED
    function handleSubmit(e: any) { 
        e.preventDefault()
        const form = e.target 
            const formdata = new FormData(form)
            if (!formdata.get("file") ) {
                showError("No file selected", "warning")
            }
    
            formdata.append("topics", JSON.stringify(selectedTops))
        
        // props.submit(formdata)

    }
    const follower = useRef<HTMLDivElement>(null);
    const bound = useRef<HTMLDivElement>(null);


    const [formState, uploadAction ] = useActionState(UploadServer, {"error": "", "message": "", "status": 0})

    useEffect(() => {
        if (formState.status === 200 || formState.status === 201) {
            showError(formState.message, "success")
        } else if ( formState.status != 0){
            showError("Upload failed: " + formState.message, "error")
        }
    }, [formState])


    return <>
        <div className="h-full w-full flex flex-col items-center justify-center overflow-y-scroll ">
            <form action={uploadAction}  className="relative h-full md:h-[90%] lg:w-[65%] w-full flex-col  items-center justify-center  md:border md:p-8 border-black rounded-md">
                <div className="flex justify-around w-full items-start flex-wrap max-h-full md:m-4 gap-3">
                    <div className="w-3/4 md:w-fit ">
                        <div className="h-full relative rounded-md md:w-100 md:h-100 w-full border-2  flex flex-col p-4 items-center justify-around">
                            <div className="flex flex-col w-full">
                                <label className="text-md font-bold">Titel</label>
                                <input required className="p-2 " type="text" name="title" id="title" placeholder="title"/>
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="description " className="text-md font-bold">Beschreibung</label>
                                <input className="p-2 " type="text" name="description" id="description" placeholder="Beschreibung" />
                            </div>
                            {preview &&
                                <div className="flex flex-col w-full">
                                    <label  className="text-sm">Alt Text</label>
                                    <input ref={altInput} className="p-2 " type="text" name="altText" id="altText" placeholder="Alt-Text Bild" />
                                </div>}
                            <div className="w-full flex justify-between py-2">
                                <Topics SelectedTopicsCallback={setSelectedTops}/>
                                <div className="flex flex-col w-full hidden">
                                    <label htmlFor="topics" className="text-md font-bold">Topics, mit kommata getrennt</label>
                                    <input readOnly className="p-2 " type="text" name="topics" id="topics" placeholder="Topics" value={selectedTops}/>
                                </div>
                                <div className="flex flex-col items-center w-8">
                                    <label className="text-sm font-bold" htmlFor="official">Official</label>
                                    <input name="official" id="official" type="checkbox"
                                    defaultChecked={false}/>
                                </div>
                            </div>      
                        </div>
                        <div className="flex flex-col bottom-0 w-full py-4 ">
                                <input className="btn btn-accent rounded-xl" type="submit" value="Hochladen"/>
                        </div>
                    </div>
        
                    
                    <div className="w-3/4 md:w-fit">
                        <div className="rounded-md relative w-full md:w-100 w-full aspect-square cursor-pointer overflow-hidden" 
                        ref={bound}
                        onMouseMove={(e: any) => {
                            const rect = bound.current!.getBoundingClientRect()
                            const x = e.clientX - rect.left
                            const y = e.clientY - rect.top
                            if (follower.current) {
                                follower.current.style.setProperty("top", y + "px");
                                follower.current.style.setProperty("left", x + "px");
                            }
                        }}
                        onClick={onImageClick}> 
                            {!preview && <div ref={follower} className={"absolute rounded-full transform-all ease-cubic duration-200 bg-red-200/90 blur-2xl w-100 h-70 -translate-x-1/2 -translate-y-1/2 z-5 "}></div>}

                            {preview ? (
                                preview.type.startsWith("image/") ? (
                                    <Image
                                        style={{ backgroundColor: "#191e24" }}
                                        src={preview.url}
                                        fill
                                        objectFit="contain"
                                        className="bg-color[#191e24]"
                                        alt=""
                                    />
                                ) : preview.type.startsWith("video/") ? (
                                    <video className="w-full h-full" controls src={preview.url} />
                                ) : preview.type === "application/pdf" ? 
                                (
                                    <iframe src={preview.url} className="w-full h-full" />
                                ) : preview.type.startsWith("audio/") ? (
                                    <audio src={preview.url} controls />) : <div>Unsupported file type</div>
                            ) : (
                                <Skeleton className="rounded-md md:w-100 md:h-100 w-full aspect-square z-4 bg-red-200 border-2 border-red-400/40 " />
                            )}

                        </div>

                        <div className="flex flex-col py-4 w-full">
                            <label htmlFor="file" className={preview ? "btn rounded-xl" : "btn rounded-xl "} >Datei auswählen</label>
                            <input ref={fileInputRef} className={"w-0 -top-5 absolute h-0 bg-red-200/0 rounded-xl " } onChange={onFileAdded} type="file" name="file" id="file" accept="image/* video/* .pdf"/>
                        </div> 
                    </div>    
                </div>
            </form>
        </div>
    </>

}

