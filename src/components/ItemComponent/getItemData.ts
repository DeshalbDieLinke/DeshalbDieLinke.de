"use server";

import { getItemURL } from "@/lib/utils";
import { listDirBucket } from "@/lib/bucket";
import { BUCKET_CDN_ENDPOINT } from "../../../config";

export async function getItemData(id: number, type: string) {
    const itemurl = getItemURL(id, type);
    if (!itemurl) return null;

    const items = await listDirBucket(`content/${type}s/${id}`);
    console.log(BUCKET_CDN_ENDPOINT + "/" + items[0]);
    console.log(items[0]);
    return items[0] ?  BUCKET_CDN_ENDPOINT + "/" +encodeURIComponent(items[0]) : null;
}
