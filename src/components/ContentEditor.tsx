/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import React, {useEffect} from "react"
import Topics from "./Topics";
import {API_DOMAIN} from "../../config";
import {DDL} from "../lib/DDL";
import ContentItemComponent from "../components/NewContentComponent.tsx";
import {type ContentItem, ContentType} from "../types/ContentItem.ts";
import { useAuth } from "@clerk/nextjs";
import useShowError from "./Error/setError.ts";
import DeleteItemFromServer from "./ItemComponent/DeleteItem.ts";
import { getContentById, updateContent } from "@/lib/db.ts";

export default function ContentEditor() {
    const [contentItem, setContentItem] = React.useState<ContentItem | null>(null)
    const [preview, setPreview] = React.useState<ContentItem | null>(null);
    const [selectedTops, setSelectedTops] = React.useState<string[]>([])


    useEffect(() => {
        const id = window.location.search.split("id=")[1]
        const searchQuery = {
            id: parseInt(id)
        }
        
        getContentById(searchQuery.id).then((res) => {
            setContentItem(res)    
        })}, [])
    // Check if user is logged in)

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
            } else {
                console.error("Selected file is not an image.");
            }
        } else {
            console.error("Selected file is not an image.");
        }
    }

    const { getToken } = useAuth()
    const setError = useShowError()
    
    async function handleDelete() {
        if (contentItem) {
            DeleteItemFromServer(contentItem)
        }
    }

    async function handleSubmit(e: any) {
        e.preventDefault()
        const form = e.target 
        const formdata = new FormData(form)
        const file = formdata.get("file") as File
        if (!file ) {
            setError("No file selected", "warning")
        }

        formdata.append("topics", JSON.stringify(selectedTops))
        formdata.append("id", contentItem!.id.toString())

        console.log("Formdata:", formdata.get("title"))
        const result = updateContent(DDL.ParseToContentItem(formdata), file)
        if (result instanceof Error) {
            setError("Failed to update content", "error")
        } else {
            setError("Content updated", "success")
        }
        
    }


    return <>
        <div className="w-full h-full flex flex-col items-center justify-center">
            {(contentItem && <form  onSubmit={handleSubmit} className="h-[80%] lg:w-[60%] flex flex-col items-center justify-center [&>*]:m-2 border p-8 border-black rounded-md">
                <div className="flex justify-around items-center max-h-full m-4">
                    <div className="form flex-shrink mr-20">
                        <div className=" ">
                            <input onChange={onFileAdded} type="file" name="file" id="file" accept="image/* video/* .pdf"
                                />
                        </div>
                        <div className="h-[30%] ">
                            <div className="flex flex-col">
                                <label className="text-sm">Titel</label>
                                <input required className="p-2 w-[20rem]" type="text" name="title" id="title" placeholder="title"
                                            defaultValue={contentItem?.title}/>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="description" className="text-sm">Beschreibung</label>
                                <input className="p-2 w-[20rem]" type="text" name="description" id="description" placeholder="Beschreibung" defaultValue={contentItem?.description}/>
                            </div>
                            {preview &&
                                <div className="flex flex-col">
                                    <label className="text-sm">Alt Text</label>
                                    <input className="p-2 w-[20rem]" type="text" name="altText" id="altText" 
                                        placeholder="Alt-Text Bild" defaultValue={contentItem?.altText}/>
                                </div>}
                            <div className="w-[20rem] flex justify-between">
                                <Topics SelectedTopicsCallback={setSelectedTops}/>
                                <div className="flex flex-col items-center w-8">
                                    <label className="text-[0.7rem]" htmlFor="official">Official</label>
                                    <input name="official" id="official" type="checkbox"
                                    defaultChecked={contentItem?.official}/>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="grid h-full">
                    {preview &&<> <label className="text-lg">Vorschau:</label>
                        <ContentItemComponent item={preview} clickCallback={() =>{} } /> </>}
                </div>
            </div>
            <div className="flex justify-around items-center relative bottom-0 w-full">
                <input className="btn btn-accent" type="submit" value="Bild Editieren"/>
                <AlertDialog>
                <AlertDialogTrigger asChild>
                    
                <input className="btn btn-primary" type="button" value="Bild Löschen" />
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                    <AlertDialogTitle>Bist Du dir sicher?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Dies kann nicht rückgängig gemacht werden. Diese Aktion löscht das Bild dauerhaft.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete()} className="cursor-pointer">Löschen</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
    
                
            </div>

            </form>) ?? <div>Kein Inhalt gefunden</div>}
        </div>
    </>

}

