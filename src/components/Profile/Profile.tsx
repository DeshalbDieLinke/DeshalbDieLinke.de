import { SignInButton, useUser } from "@clerk/nextjs";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import Card from "../Card";
import GridWrapper from "../NewContentDisplay";
import { ContentItem } from "@/types/ContentItem";
import { DDL } from "@/lib/DDL";


/* @param {string} id - The id of the user to display the profile for. 
/* If not provided, the profile of the currently signed in user will be displayed.
*/
function Profile(props: { id?: string }) {

    if (props.id) {
        // Fetch the user with the given id
    }
    // For now assume the user is accessing their own profile
    const { user  } = useUser();    
    if (!user) {
        return <div>
            <p> You must be signed in to view your profile</p>
            <SignInButton />
        </div>;
    }

    const userBio = user.publicMetadata.bio as string;
    const userName = user.username;

    const [contentItems, setContentItems] = useState<ContentItem[]>([]);

    useEffect(() => { 
        DDL.GetContentItems((materials) => {
            setContentItems(materials);
        });
    }, []);
    return ( 

        <div className="flex flex-col w-screen h-full b-red-200">
            
            <div className=" flex bg-blue-200 w-full items-center justify-center p-4">
                <Suspense fallback={<Skeleton className="rounded-full bg-black w-24 h-24" />}>
                <Image src={user.imageUrl} width={100} height={100} alt="Profile Picture" className=" z-5 border-black rounded-full bg-white"/>
                </Suspense>
                <div className="z-5 absolute outline-2 outline- outline-black 1-5 w-24 h-24 rounded-full "></div>
            </div>
            {(userBio || userName) && 
            <div className="z-3 bg-white p-4 shrink shadow-md border-t-2 h-fit max-h-50 h-fit rounded-xl left-1/2 -translate-x-1/2 z-2 relative w-9/10 -top-10 grow items-center justify-center">
                {userName && <p className="font-black text-2xl ">@{userName}</p> }
                {userBio && <p className="text-sm ">{userBio}</p> }
            </div>}

            <div className="w-9/10 bg-gray-100 h-full grow p-4 left-1/2 -translate-x-1/2 z-1 relative rounded-xl  ">
                <GridWrapper contentItems={contentItems}/>
            </div>

        </div>
    );
}

export default Profile;