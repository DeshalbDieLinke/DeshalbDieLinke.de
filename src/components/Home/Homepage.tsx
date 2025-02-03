import HomeCard from "./HomeCard";
import HomeCardWrapper from "./HomeCardWrapper";

export default function Homepage() {
    return (
    <>
    <div className="h-full w-full p-12">
        <div className="flex flex-col items-center justify-center h-screen gap-12">
            <HomeCardWrapper className="">
            {/* Center (deck) card */}
            <HomeCard
                purpose="material"
                className="bg-blue-200 center-card z-10 ">
                <img
                    src="/images/cards/banner.webp"
                    alt="Material"
                    className="object-cover h-full w-full rounded-xl"
                    />
                    <div className="absolute bottom-0  left-1/2 -translate-x-1/2 w-full bg-blue-200 text-center flex items-center justify-center ">
                        <p className="text-6xl  font-black translate-y-6">Material</p>
                    </div>
            </HomeCard>

            {/* Card that fans out top left */}
            <HomeCard
            purpose="about"
            className="bg-green-700 z-5 animate-fanOutBottomLeft ">
                <img
                    src="/images/kms.jpg"
                    alt="Über uns"
                    className="object-cover h-full w-full rounded-xl"
                />
                <div className="absolute bottom-0 -top-40 -left-40 rotate-32 h-fit">
                            <p className="text-3xl  font-black translate-y-6">Unser Team</p>
                </div>
            </HomeCard>

            {/* Card that fans out top right */}
            <HomeCard
            purpose="FAQ"
            className="bg-fuchsia-400 
                z-8 animate-fanOutTopLeft">
                <img
                    src="/images/bg-ppl-text.jpg"
                    alt="FAQ"
                    className="object-cover h-full w-full rounded-xl"
                />
                <div className="absolute bottom-0 -top-40 -left-40 rotate-20 h-fit">
                                <p className="text-5xl  font-black translate-y-6">FAQ</p>
                </div>
            </HomeCard>

            {/* Card that fans out bottom left */}
            <HomeCard
            purpose="profile"
            className="bg-orange-200
                z-8 animate-fanOutTopRight">
            <img
                src="/images/bg-ppl-text.jpg"
                alt="Illustration 4"
                className="object-cover h-full w-full rounded-xl"
            />
            </HomeCard>

            {/* Card that fans out bottom right */}
            <HomeCard
            purpose="register"
            className="bg-red-700 z-5 animate-fanOutBottomRight">
            <img
                src="/images/bg-ppl-text.jpg"
                alt="Mitmachen"
                className="object-cover h-full w-full rounded-xl"
            />
            </HomeCard>
        </HomeCardWrapper>
        </div>
    </div>
    </>
);
}
