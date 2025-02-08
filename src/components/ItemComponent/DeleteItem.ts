"use server";
import { getUserDDL, isAdmin } from "@/lib/auth";
import { DeleteFromBucket, listDirBucket } from "@/lib/bucket";
import { deleteFromDB } from "@/lib/db";
import { ContentItem } from "@/types/ContentItem";



function DeleteItemFromServer(item: ContentItem) {
    const deleteFromServer = async () => { 
        // Chech if it is permitted to delete
        const user = await getUserDDL()
        if (!user) {
            return {error: "Not authenticated", status: 401}
        }
        const userIsAdmin = await isAdmin(user)

        if (!userIsAdmin && user.id != item.autherID) {
            return {error: "Not authorized to delete", status: 401}
        }
        // Continue with deletion
        // Delete from Bucket
        const itemsToDelete = await listDirBucket(`content/${item.type}s/${item.id}`);
        console.log(itemsToDelete)
        DeleteFromBucket(itemsToDelete)

        // Delete from DB
        deleteFromDB(item.id)

    }
    return deleteFromServer()

}

export default DeleteItemFromServer;
