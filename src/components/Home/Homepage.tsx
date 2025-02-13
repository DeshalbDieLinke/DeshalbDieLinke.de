"use client";
import Image from "next/image";
import HomeCard from "./HomeCard";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Homepage() {

    const router = useRouter();

    const transitionToMaterial = async () => {
        await router.push("/material");
    }
    
    return (
    <>
    <div  className="w-full p-4 flex justify-center items-center flex-col gap-4  ">

        <div className=" flex-col items-center justify-center h-screen hidden lg:flex">
            

            <div className="cards  w-full ">
            {/* Center (deck) card */}
                <HomeCard
                    purpose="/material"
                    onClick={transitionToMaterial}
                    className="bg-gradient-to-br from-bnlue-200 via-blue-300 to-fuchsia-100 center-card z-10 flex flex-col overflow-hidden">
                    <motion.div
                        layoutId="main-image"
                        className="relative w-full h-full grow"
                        transition={{
                            type: "spring",
                            ease: "easeIn",
                            duration: 0.1,
                        }}
                    >
                        <Image 
                            src="https://ddl.fra1.cdn.digitaloceanspaces.com/Banner.jpg" 
                            fill 
                            alt="Material" 
                            className="object-cover" 
                        />
                    </motion.div>
                    <div className="h-20 text-center z-12 absolute bottom-10 rounded-xl w-3/4 left-1/2 -translate-x-1/2 bg-black/50 flex items-center justify-center">
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
            </div>
        </div>
             {/* Mobile version */}
        <div className="flex flex-col w-full max-h-3/4 lg:hidden justify-center items-center gap-8">
            <motion.div 
                layoutId="main-image-mobile" 
                className="w-full h-[300px] relative cursor-pointer"
                onClick={transitionToMaterial}
            >
                <Image 
                    src="https://ddl.fra1.cdn.digitaloceanspaces.com/Banner.jpg" 
                    alt="Material" 
                    fill 
                    className="object-cover" 
                />
            </motion.div>
            <motion.div 
                layoutId="accent-background-mobile"
                className="btn bg-accent rounded-md"
                transition={{
                    type: 'spring',
                    bounce: 0.2,
                    duration: 0.1
                }}
                onClick={transitionToMaterial}
            >
            <button 
                    onClick={transitionToMaterial}
                    className="btn relative z-10 bg-transparent border-none"
                > 
                <motion.p 
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-white"
                >
                    Material entdecken
                </motion.p>
            </button>
            </motion.div>
        </div>
    </div>
    </>
);
}
