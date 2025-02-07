"use server"

import { UploadItem, uploadToDB } from "@/lib/db";
import { ContentItem, ContentType } from "@/types/ContentItem";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function UploadServer(formdata: FormData): Promise<void | undefined> {
    const {userId, } = await auth()

    if (!userId) {
        return 
    }

    
    const client = await clerkClient()

    const user = await client.users.getUser(userId)

    let file = formdata.get("file") as File
    if (!file) {
        return 
    }

    const official = formdata.get("official") == "on"
    if (official) {
        if (!user.privateMetadata["official"]) {
            return
        }
    }
    let type: ContentType = file.type.split("/")[0] as ContentType
    let item: UploadItem = {
        title: formdata.get("title") as string,
        description: formdata.get("description") as string,
        official: formdata.get("official") == "on",
        type: type,
        alt: formdata.get("altText") as string,
        autherId: "1"
    }
    uploadToDB(item)
    return 

}