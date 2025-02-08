

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Suspense } from "react";
import GridWrapper from "../NewContentDisplay";
import { ContentItem } from "@/types/ContentItem";
import {  currentUser } from "@clerk/nextjs/server";
import { getContentByUserId } from "@/lib/db";


/* @param {string} id - The id of the user to display the profile for. 
/* If not provided, the profile of the currently signed in user will be displayed.
*/
async function Profile(props: { id?: string }) {
    console.log("Profile id", props.id);
    // const [user, setUser] = useState<User | null>(null);
    const user = await currentUser();
    if (!user) {
        return <div>Not signed in</div>
    }
    const items = await getContentByUserId(user.id);
    if (items instanceof Error) {
        return <div>Error: {items.message}</div>
    }
    const userContent = items as ContentItem[];

    // get user by auth 



    return ( 

        <div className="flex flex-col w-screen h-full b-red-200">
            <SignedIn >
            <div className=" flex bg-blue-200 w-full items-center justify-center p-4">
                <Suspense >
                {/* <UserButton appearance={{
                    elements: {
                        userButtonAvatarBox : {
                            width: 24,
                            height: 24,
                        },
                        userButtonTrigger :{
                            borderRadius: "100%",
                            scale: 1.5,
                            width: 24,
                            height: 24,
                            zIndex: 10,
                        },
                    } 
                }}/> */}
                <Image src={user!.imageUrl} width={100} height={100} alt="Profile Picture" className=" z-5 border-black rounded-full bg-white"/>
                </Suspense>
                <div className="z-5 absolute outline-2 outline- outline-black 1-5 w-24 h-24 rounded-full "></div>
            </div>
            
            <div className="z-3 bg-white p-4 shrink shadow-md border-t-2 h-fit max-h-50 h-fit rounded-xl left-1/2 -translate-x-1/2 z-2 relative w-9/10 -top-10 grow items-center justify-center">
                <div className="flex flex-row items-start justify-between">
                        <div className="flex flex-col"><div className="flex flex-col items-center justify-center">
                        {user!.username && <p className="font-black text-2xl ">@{user!.username}</p> }
                        </div>
                        <div>
                        {user!.publicMetadata.bio as string ? <p className="text-sm ">{user!.publicMetadata.bio as string}</p> : <p className="text-sm ">No bio provided</p>}
                        </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                    <UserButton />
                    <a href="/upload">Upload</a>
                </div>
            </div>
                
            
            </div>

            <div className="w-9/10 bg-gray-100 h-full grow p-4 left-1/2 -translate-x-1/2 z-1 relative rounded-xl  ">
                <GridWrapper contentItems={userContent}/>
            </div>        
            
            </SignedIn> 
            <SignedOut>
                <SignInButton />
            </SignedOut>
        </div>
    );
}

export default Profile;