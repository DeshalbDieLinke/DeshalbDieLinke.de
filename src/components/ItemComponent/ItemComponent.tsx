"use client";

import { type ContentItem, ContentType } from "@/types/ContentItem";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCachedItemData } from "@/lib/itemCache";

export default function ItemComponent({ item, clickCallback }: { item: ContentItem, clickCallback: (item: ContentItem) => void }) {
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        getCachedItemData(item.id, item.type).then(setUrl)
    }, [item])

    return (
        <button className={"relative contentItem rounded-md border border-black border-outset p-4 bg-white no-underline overflow-hidden"} 
            onClick={() => { clickCallback(item); }}>
            {item.official && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-9">
                    <Image src="https://ddl.fra1.cdn.digitaloceanspaces.com/icons/verified.svg" alt="Offiziell" width="20" height="20" />
                </div>
            )}
            {url && item.type === ContentType.Image && <img loading="lazy" src={url} alt={item.altText} className="object-contain" />}
            {url && item.type === ContentType.Video && <video src={url} />}
            {url && item.type === ContentType.Text && <p>{item.description}</p>}
            {url && item.type === ContentType.Audio && <audio src={url} controls />}
            {url && item.type === ContentType.PDF && <embed src={url} type="application/pdf" />}
            
        </button>
    );
}
