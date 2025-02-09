"use client";
import { DDL } from "@/lib/DDL";
import React, { useEffect } from "react";
import { transferItems } from "./transferItems";
import { ContentItem } from "@/types/ContentItem";

function TransferContent() {
    const [successfullyTransferred, setSuccessfullyTransferred] = React.useState(0);
    const [failedToTransfer, setFailedToTransfer] = React.useState(0);
    const [itemsToTransfer, setItemsToTransfer] = React.useState<ContentItem[]>([]);
    const [failedItems, setFailedItems] = React.useState<ContentItem[]>([]);

    useEffect(() => {
        DDL.GetContentItems((materials) => {
            setItemsToTransfer(materials);
        });
    }, []);

    const transferItem = (item: ContentItem) => {
        transferItems(item).then((res) => {
            if (res?.error) {
                console.error(res.error);
                setFailedItems((prev) => [...prev, item]);
                setFailedToTransfer((prev) => prev + 1);
            } else {
                console.log("Successfully transferred item");
                setSuccessfullyTransferred((prev) => prev + 1);
            }
            // Update itemsToTransfer without mutating the state directly
            setItemsToTransfer((prev) => prev.filter((i) => i.id !== item.id));
        });
    };

    const transferAllItems = () => {
        itemsToTransfer.forEach((item) => transferItem(item));
    };

    return (
        <div>
            <h1>Transfer Content</h1>
            <p>
                Transfer from old db to new:{" "}
                <button onClick={transferAllItems}>Transfer ALL</button>
            </p>
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
        {itemsToTransfer.map((item) => (
            <tr key={item.id} className="*:text-sm *:overflow-hidden *:max-w-screen">
                <td>{item.title}</td>
                <td>{item.topics.join(", ")}</td>
                <td>{item.altText}</td>
                <td>{item.autherID}</td>
                <td>{item.url ? "true" : "false"}</td>
                <td>
                    <button onClick={() => transferItem(item)}>Transfer</button>
                </td>
            </tr>
        ))}
            </tbody>
        </table>
        </div>
    );
}

export default TransferContent;
