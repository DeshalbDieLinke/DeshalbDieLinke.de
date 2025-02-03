import HomeCard from "./HomeCard";
import HomeCardWrapper from "./HomeCardWrapper";
import HomeTile from "./HomeTile";

export default function Homepage() {
    return (
    <>
    <div className="h-screen w-full p-4 flex justify-center items-center flex-col gap-4 bg-gradient-to-br from-grey-200 via-grey-100 to-red-100">
        <div className=" flex-col items-center justify-center h-screen hidden lg:flex">
            <HomeCardWrapper className="cards h-full w-full ">
            {/* Center (deck) card */}
            <HomeCard
                purpose="/material"
                className="bg-gradient-to-br from-blue-200 via-blue-300 to-fuchsia-100 center-card z-10 flex flex-col">
                <img
                    src="/images/cards/banner.webp"
                    alt="Material"
                    className="object-cover h-full w-full rounded-xl grow"
                    />
                    <div className=" h-20 text-center flex items-center justify-center ">
                        <p className="text-6xl font-black translate-y-8">Material</p>
                    </div>
            </HomeCard>

            {/* Card that fans out top left */}
            <HomeCard
            purpose="/about"
            className="bg-green-200 z-5 animate-fanOutBottomLeft ">
                {/* <img
                    src="/images/kms.jpg"
                    alt="Über uns"
                    className="object-cover h-full w-full rounded-xl"
                />
                <div className="absolute bottom-0 -top-40 -left-40 rotate-32 h-fit">
                            <p className="text-3xl  font-black translate-y-6">Unser Team</p>
                </div> */}
                <p className="absolute -top-3 left-12 origin-left rotate-90 whitespace-nowrap text-6xl font-black ">
                Team
                </p>
            </HomeCard>

            {/* Card that fans out top right */}
            <HomeCard
            purpose="/faq"
            className="bg-fuchsia-200 
                z-8 animate-fanOutTopLeft">
                {/* <img
                    src="/images/bg-ppl-text.jpg"
                    alt="FAQ"
                    className="object-cover h-full w-full rounded-xl"
                />
                <div className="absolute bottom-0 -top-40 -left-40 rotate-20 h-fit">
                                <p className="text-5xl  font-black translate-y-6">FAQ</p>
                </div> */}
            <p className="absolute -top-5 left-16 origin-left rotate-90 whitespace-nowrap text-8xl font-black ">
                FAQ
            </p>
                
            </HomeCard>

            <HomeCard
            purpose="#intro"
            className="bg-orange-200
                z-8 animate-fanOutTopRight">
            {/* <img
                src="/images/bg-ppl-text.jpg"
                alt="Mehr Infos"
                className="object-cover h-full w-full rounded-xl"
            />
                <div className="absolute bottom-0 w-fit -top-40 left-70 -rotate-20 h-fit">
                                <p className="text-3xl w-fit font-black translate-y-6">Mehr Infos</p>
                </div> */}
            <p className="absolute top-40 -right-32 origin-left -rotate-90 whitespace-nowrap text-8xl font-black ">
                Info
            </p>
            </HomeCard>

            <HomeCard
            purpose="/register"
            className="bg-indigo-200 z-5 animate-fanOutBottomRight">
            {/* <img
                src="/images/bg-ppl-text.jpg"
                alt="Mitmachen"
                className="object-cover h-full w-full rounded-xl"
            />
            <div className="absolute bottom-0 -top-50 left-70  -rotate-40 h-fit">
                <p className="text-3xl  font-black translate-y-6">Mitmachen</p>
            </div> */}
            <p className="absolute top-50 text-right -right-40 origin-left -rotate-90 whitespace-nowrap text-6xl font-black ">
                Mit-<br/>machen
            </p>
            
            </HomeCard>
            </HomeCardWrapper>
        </div>
            <div className="grid w-full  grid-cols-2 grid-rows-2 gap-4 lg:hidden mb-20">
                    <HomeTile src="/images/cards/banner.webp" title="Material" href={"/material"} color="bg-blue-200" className="col-span-2" />
                    <HomeTile src="/images/bg-ppl-text.jpg" title="Mitmachen"href={"/register"} color="bg-orange-200" />    
                    <HomeTile src="/images/bg-ppl-text.jpg" title="FAQ" href={"/faq"} color="bg-fuchsia-200" />
            </div>
    </div>
    </>
);
}
