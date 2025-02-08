/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { useAuth } from "@clerk/nextjs"
import useShowError from "../Error/setError"
import UploadComponent from "./UploadComponent"
import UploadLoading from "./UploadLoading"
import React from "react"


function Upload() {
    
    const [uploadStatus, setUploadStatus] = React.useState<"idle" | "uploading" | "success">("idle")
    



    return <div className="py-8 mt-4" >
        <UploadComponent  />
        <div>
            {uploadStatus !== "idle" && 
            <UploadLoading status={uploadStatus} />} 

        </div>
    </div>}

export default Upload;


