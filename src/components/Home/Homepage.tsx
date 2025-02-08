"use client";
import Image from "next/image";
import Card from "../Card";
import HomeCard from "./HomeCard";
import HomeCardWrapper from "./HomeCardWrapper";
import React from "react";

export default function Homepage() {
    // const follower = React.useRef<HTMLDivElement>(null);
    // const followerBlue = React.useRef<HTMLDivElement>(null);
    // const followerGreen = React.useRef<HTMLDivElement>(null);
    // const bound = React.useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     const handleMouseMove = (e: any) => {
    //         const rect = bound.current?.getBoundingClientRect();

    //         if (!rect) return;
    //         if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
    //             return;
    //         }
    //         const x = e.clientX - rect.left; 
    //         const y = e.clientY - rect.top;

    //         if (follower.current && followerBlue.current && followerGreen.current) {
    //             follower.current.style.setProperty("top", y + "px");
    //             follower.current.style.setProperty("left", x + "px");
    //             // Chaotic movement of the blue follower
    //             const xBlue = x + Math.random() * 500 - 50;
    //             followerBlue.current.style.setProperty("top", y + "px");
    //             followerBlue.current.style.setProperty("left", xBlue + "px");
    //             followerGreen.current.style.setProperty("top", y + "px");
    //             followerGreen.current.style.setProperty("left", x + "px");

    //         }
    //     }
    //     window.addEventListener("mousemove", handleMouseMove);
    //     return () => {
    //         window.removeEventListener("mousemove", handleMouseMove);
    //     }


    // }, []);


    return (
    <>
    {/* <div ref={bound} className="w-screen absolute top-[3.5rem] left-0 h-screen overflow-hidden"> 
        <div ref={follower} className={"z-1 absolute shadow-2xl shadow-red-200 rounded-full bg-red-200/80 pointer-events-none transition-all duration-100 ease-linear blur-[100vw] w-[100vw] aspect-square -translate-x-1/2 -translate-y-1/2  "}></div>
        <div ref={followerBlue} className={"z-1 rotate-45 absolute shadow-2xl shadow-red-200 rounded-full bg-blue-200/80 pointer-events-none transition-all duration-100 ease-linear blur-[100vw] w-[25vw] h-40 -translate-x-180  -translate-y-[10vh]  "}></div>
        <div ref={followerGreen} className={"z-1 absolute shadow-2xl shadow-orange-200 rounded-full bg-green-100/90 pointer-events-none transition-all duration-100 ease-cubic blur-[50vw] w-[5vw] h-10 translate-x-1/2  -translate-y-0  "}></div>

    </div>
 */}

    <div  className="w-full p-4 flex justify-center items-center flex-col gap-4 bg-gradient-to-br from-grey-200 via-grey-100 to-red-100 ">

        <div className=" flex-col items-center justify-center h-screen hidden lg:flex">
            

            <HomeCardWrapper className="cards  w-full ">
            {/* Center (deck) card */}
            <HomeCard
                purpose="/material"
                className="bg-gradient-to-br from-bnlue-200 via-blue-300 to-fuchsia-100 center-card z-10 flex flex-col">
                <Image src="https://ddl.fra1.cdn.digitaloceanspaces.com/Banner.jpg" fill alt="Material" className="object-cover h-full w-full rounded-xl grow" />
                <div className=" h-20 text-center z-12 absolute bottom-10 rounded-xl w-3/4 left-1/2 -translate-x-1/2 bg-black/50 flex items-center justify-center ">
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
