"use client";
import { DDL } from "@/lib/DDL";
import React, { useEffect } from "react";
import { transferItems } from "./transferItems";
import { ContentItem } from "@/types/ContentItem";
import { getContent } from "@/lib/db";

function TransferContent() {
   const [contentItems, setContentItems] = React.useState<ContentItem[]>([]); 

    useEffect(() => {
        getContent().then((res) => {
            if (res) {
                setContentItems(res);
            }
        });
    }, []);

    return (
        <div>
            <h1>Mass edit Content</h1>
           
            <table className="max-w-9/10">
    <thead>
        <tr>
            <th>Title</th>
            <th>Topics</th>
            <th>Alt Text</th>
            <th>Author ID</th>
            <th>URL</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        {contentItems.map((item) => (
            <tr key={item.id} className="*:text-sm *:overflow-hidden *:max-w-screen">
                <td>{item.title}</td>
                <td>{item.topics.join(", ")}</td>
                <td>{item.altText}</td>
                <td>{item.autherID}</td>
                <td>{item.url ? "true" : "false"}</td>
                <td>
                    <button onClick={() => {}}></button>
                </td>
            </tr>
        ))}
            </tbody>
        </table>
        </div>
    );
}

export default TransferContent;
