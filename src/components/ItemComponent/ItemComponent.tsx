"use client";

import { type ContentItem, ContentType } from "@/types/ContentItem";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BUCKET_CDN_ENDPOINT } from "../../../config";

export default function ItemComponent({ item, clickCallback }: { item: ContentItem, clickCallback: (item: ContentItem) => void }) {
    const [url, setUrl] = useState<string>("");

    // add a state for the url and display loading spinner while fetching the contents
    const fetchContents = async () => {
        const dir = `content/${item.type}s/${item.id}`;
        const url = `https://ddl.fra1.cdn.digitaloceanspaces.com/?list-type=2&prefix=${encodeURIComponent(dir)}`;
        
        try {
            // Gets a list of keys in the specified directory
            //TODO cache this
            const response = await fetch(url);
            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "text/xml");
            const keys = Array.from(xmlDoc.getElementsByTagName('Key'))
                .map(key => key.textContent)
                .filter(key => key !== null) as string[];
            // Set the first key as the URL. Supports multiple files in the future.
            setUrl(BUCKET_CDN_ENDPOINT + "/" + keys[0]);
        } catch (err) {
            console.log('Error:', err);
        }
    };
    
    useEffect(() => {
        fetchContents();
    }, []);
    // Update item url when it changes. ContentPopup requires this.
    useEffect(() => {
        item.url = url;
    }, [url]);

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
