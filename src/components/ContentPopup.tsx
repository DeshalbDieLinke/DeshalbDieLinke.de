

/* eslint-disable @typescript-eslint/no-explicit-any */
/* esling-disable @typescript-eslint/no-unused-vars */

import { SignedIn, useAuth } from "@clerk/nextjs";
import {ContentType, type ContentItem} from "../types/ContentItem";
import {useEffect, useState} from "react";

export default function ContentPopup(props: {item: ContentItem, deleteCallback: (_: any) => void}) { 
    const del = () => {
        props.deleteCallback(null);
    };

    
    const [canEdit, setCanEdit] = useState(false);
    const { userId } = useAuth();




    useEffect(() => {
        setCanEdit(userId === props.item.autherID);
    }, []);

    useEffect(() => {
        console.log("Can edit: " + canEdit);
    }, [canEdit]);

    return <div className=" backdrop-blur-sm bg-gray-500/50 z-99 h-screen w-screen fixed top-0 left-0"> 

        <div id="default-modal" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 
        justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow bg-frey-300">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-black text-black">
                    {props.item.title}
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => del()}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5 space-y-4  rounded-md">
            {props.item.type == ContentType.Video && <video src={props.item.url} controls />}
            {props.item.type == ContentType.Text && <p>{props.item.description}</p>}
            {props.item.type == ContentType.Image && <img src={props.item.url} />}
            {props.item.type == ContentType.Audio && <audio src={props.item.url} controls />}
            {props.item.type == ContentType.PDF && <embed src={props.item.url} type="application/pdf" />}
            </div>
            <div className="flex justify-around items-center w-ful p-2 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <a download href={props.item.url} className="visited:text-white hover:[&>*]:text-black bg-[var(--primary)] hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
                    <p className="text-white h-min translate-y-1">Herunterladen</p></a>
                <SignedIn>
                    <a href={"/edit-content?id=" + String(props.item.id)} className="text-black hover:text-gray-500">Bild
                    Editieren </a>
                </SignedIn>
                <button onClick={ () => {
                    try {
                        shareFile(props.item);
                    }
                    catch (e) {
                        alert("Fehler beim Teilen: " + e);
                    }}} 
                    className="text-white bg-[var(--primary)] hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Bild Teilen</button>
            </div>
        </div>
    </div>
</div>
</div>
}

async function shareFile(item: ContentItem) {
    try {
      // Fetch the file from the server
      const response = await fetch(item.url!); // Replace with your server file path
    if (!response.ok) throw new Error('Failed to fetch file');

      // Convert the response to a Blob
    const blob = await response.blob();
    const filename = item.url!.split("/").pop() ?? "sharepic.png";
      // Create a File object
    const file = new File([blob], filename, { type: blob.type });

      // Check if navigator.share is supported
    if (navigator.share && navigator.canShare({ files: [file] })) {
        // Use navigator.share
        await navigator.share({
        title: file.name,
        text: '#DeshalbDieLinke',
        files: [file],
        });
        console.log('File shared successfully!');
    } else {
        alert('Sharing not supported or file type not shareable.');
    }
    } catch (error) {
        alert('Error sharing file:' + error);
    }
}