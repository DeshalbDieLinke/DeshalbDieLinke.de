"use client";

import ContentEditor from "@/components/ContentEditor";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

function editContent() {
    return (  <main className="bg-gray-100 h-screen">
        <SignedIn>
            <ContentEditor />
        </SignedIn>
        <SignedOut>
            <p className="text-center">Bitte melde dich an, um den Inhalt zu bearbeiten.</p>
            <div className="flex justify-center h-full items-center">
                <div className="btn-primary btn">
                <SignInButton />
                </div>
                </div>
        </SignedOut>
    </main> );
}

export default editContent;