/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */


"use server"

import { UploadToBucket } from "@/lib/bucket";
import { UploadItem, uploadToDB } from "@/lib/db";
import { ContentItem, ContentType } from "@/types/ContentItem";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function UploadServer(state: any, payload: FormData): Promise<{error: string, message: string, status: number}>
{   
    const formdata = payload
    const {userId, } = await auth()

    if (!userId) {
        return {error: "Not authenticated", message: "You must be logged in to upload content", status: 401}
    }
    
    const client = await clerkClient()

    const user = await client.users.getUser(userId)

    const file = formdata.get("file") as File
    if (!file) {
        return {error: "No file", message: "You must upload a file", status: 400}
    }   

    const official = formdata.get("official") == "on"
    if (official) {
        if (!user.privateMetadata["official"]) {
            return {error: "Not official", message: "You must be an official user to upload official content", status: 403}
        }
    }
    let type: ContentType
    try {
        type = file.type.split("/")[0] as ContentType }
    catch (e) {
        return {error: "Invalid file type", message: "Invalid file type", status: 400}
    }
    const item: UploadItem = {
        title: formdata.get("title") as string,
        description: formdata.get("description") as string,
        official: formdata.get("official") == "on",
        type: type as ContentType,
        alt: formdata.get("altText") as string,
        autherId: userId
    }
    const res = await uploadToDB(item)
    if (res instanceof Error) {
        return {error: "Database error", message: res.message, status: 500}
    } else if (  typeof res !== "number") {
        return {error: "Database error", message: "Invalid response from database", status: 500}
    } 

    const bucketResponse = await UploadToBucket(file, res as number )
    if (bucketResponse != true) {
        return {error: "Bucket error", message:"Failed to Upload File", status: 500}
    }
    return {error: "", message: "Success", status: 200}

}