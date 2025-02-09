"use client";

import { useEffect, useState } from "react";
import { type ContentItem, ContentType } from "@/types/ContentItem";
import { getItemData } from "./getItemData";

export default function ItemComponent({ item, clickCallback }: { item: ContentItem, clickCallback: (item: ContentItem) => void }) {
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        getItemData(item.id, item.type).then((url) => {
            setUrl(url);
            if (url)
            item.url = url;
        });

    }, [item]);

    return (
        <button className={"contentItem rounded-md border border-black border-outset p-4 bg-white no-underline overflow-hidden"} 
            onClick={() => { clickCallback(item); }}>
            {item.official && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-9">
                    <img src="/images/icons/verified.svg" alt="Offiziell" width="20" height="20" />
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
