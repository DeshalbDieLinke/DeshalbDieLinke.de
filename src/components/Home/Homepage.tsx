import Image from "next/image";
import Card from "../Card";
import HomeCard from "./HomeCard";
import HomeCardWrapper from "./HomeCardWrapper";

export default function Homepage() {

    return (
    <>
    <div className="w-full p-4 flex justify-center items-center flex-col gap-4 bg-gradient-to-br from-grey-200 via-grey-100 to-red-100">
        <div className=" flex-col items-center justify-center h-screen hidden lg:flex">
            <HomeCardWrapper className="cards  w-full ">
            {/* Center (deck) card */}
            <HomeCard
                purpose="/material"
                className="bg-gradient-to-br from-bnlue-200 via-blue-300 to-fuchsia-100 center-card z-10 flex flex-col">
                <Image src="/Images/Banner.jpg" fill alt="Material" className="object-cover h-full w-full rounded-xl grow" />
                <div className=" h-20 text-center z-12 absolute bottom-10 rounded-xl w-full left-1/2 -translate-x-1/2 bg-[var(--primary)] flex items-center justify-center ">
                    <p className="text-6xl font-black text-white translate-y-8">Material</p>
                </div>
            </HomeCard>

            {/* Card that fans out top left */}
            <HomeCard
            purpose="/about"
            className="bg-green-200 z-5 animate-fanOutBottomLeft ">
                <p className="absolute -top-3 left-12 origin-left rotate-90 whitespace-nowrap text-6xl font-black ">
                Team
                </p>
            </HomeCard>

            {/* Card that fans out top right */}
            <HomeCard
            purpose="/faq"
            className="bg-fuchsia-200 
                z-8 animate-fanOutTopLeft">
            <p className="absolute -top-5 left-16 origin-left rotate-90 whitespace-nowrap text-8xl font-black ">
                FAQ
            </p>
                
            </HomeCard>

            <HomeCard
            purpose="#intro"
            className="bg-orange-200
                z-8 animate-fanOutTopRight">
            <p className="absolute top-40 -right-32 origin-left -rotate-90 whitespace-nowrap text-8xl font-black ">
                Info
            </p>
            </HomeCard>

            <HomeCard
            purpose="/register"
            className="bg-indigo-200 z-5 animate-fanOutBottomRight">
            <p className="absolute top-50 text-right -right-40 origin-left -rotate-90 whitespace-nowrap text-6xl font-black ">
                Mit-<br/>machen
            </p>
            
            </HomeCard>
            </HomeCardWrapper>
        </div>
            <div className=" w-full  grid-cols-2 flex-wrap lg:hidden justify-center items-center gap-8">
                <div className="h-1/2">
                    <Card image="/Images/Banner.jpg" action="Material entdecken" link={"/material"}  />
                </div>
                <div className="flex ml-4 flex-col gap-1">
                    <p> Wir brauchen Dich! Wenn du Technisch, Graphisch, oder Inhaltlich was drauf hast, meld dich! </p>
                    <a href="/register" className="btn bg-accent rounded-md"> <p className="text-white"> Mitmachen!</p></a>

                </div>

                
            </div>
    </div>
    </>
);
}
