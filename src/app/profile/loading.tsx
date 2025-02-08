import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="flex flex-col w-screen justify-center items-center h-screen"> 
            <div className=" flex bg-blue-200 w-full items-center justify-center p-4">
                <Skeleton className="h-24 w-24 z-5 border-black rounded-full bg-white" />
                <Skeleton className="z-5 absolute outline-2 outline- outline-black 1-5 w-24 h-24 rounded-full" />   
            </div>
            <div className="z-3 bg-white p-4 shrink shadow-md border-t-2 h-fit max-h-50 h-fit rounded-xl  z-2 relative w-9/10 -top-10 grow items-center justify-center">
                <div className="flex flex-row items-start justify-between">
                        <div className="flex flex-col"><div className="flex flex-col items-center justify-center">
                        <p className="font-black text-2xl ">@...</p> 
                        </div>
                        <div>
                        <p className="text-sm ">...</p>
                        </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                    <Skeleton className="h-10 w-10" />
                    <a href="/upload">Upload</a>
                </div>
            </div>
                
            
            </div>

            <div className="w-9/10 bg-gray-100 h-full grow p-4 z-1 relative rounded-xl  ">
                <Skeleton className="h-fyll w-full bg-red-200" />
            </div>  
    
        </div>
}