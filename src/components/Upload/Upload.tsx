"use client";
import { useAuth } from "@clerk/nextjs"
import useShowError from "../Error/setError"
import { API_DOMAIN } from "../../../config"
import UploadComponent from "./UploadComponent"
import UploadLoading from "./UploadLoading"
import React, { useCallback } from "react"
import { UploadServer } from "./UploadServer";


function Upload() {
    const [uploadStatus, setUploadStatus] = React.useState<"idle" | "uploading" | "success">("idle")
    const { getToken } = useAuth()
    const showError = useShowError()
    
    // fetch( API_DOMAIN + "/auth/upload", {
    //     method: "POST",
    //     headers: {
    //             "Authorization": `Bearer ${await getToken()}`
    //     },
    //     credentials: "include",
    //     body: formdata
        
    // }).

    async function submit(formdata: FormData): Promise<void | Response> { 
        console.log("Formdata:", formdata.get("title"))
        return UploadServer(formdata).then((res) => {
                if (!res) {
                    showError("No Response", "error")
                    setUploadStatus("idle")
                }
                if (res) {
                    setUploadStatus("success")
                } else {
                    console.log(res)
                    showError("Bad response: " + res, "error")
                    setUploadStatus("idle") }},
            ).catch((err) => {
                showError("404: " + err, "error")
                setUploadStatus("idle")
            })
    } 
    const onSubmit = useCallback(
        async (formdata: FormData) => {
            const promise = submit(formdata);
    
            if (!promise) {
            return;
        }
        },
        [submit] // Dependencies for useCallback
    );
    

    return <div className="py-8 mt-4" >
        <UploadComponent submit={onSubmit} />
        <div>
            {uploadStatus !== "idle" && 
            <UploadLoading status={uploadStatus} />} 

        </div>
    </div>}

export default Upload;


