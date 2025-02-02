import HomeCard from "./HomeCard"
import HomeCardWrapper from "./HomeCardWrapper"

export default function Homepage() {

    return <>
        <div className="h-full w-full p-12">
            <div className="flex flex-col items-center justify-center h-screen gap-12 overflow-hidden ">
                <HomeCardWrapper className="overflow-hidden relative w-full"> 
                        <HomeCard purpose="Illustration 1" className="bg-blue-200 absolute translate-x-160 translate-y-10 -rotate-45  top-20">
                            <img src="/images/bg-ppl-text.jpg" alt="Illustration 1" className="object-cover h-full w-full overflow-hidden rounded-xl" />
                        </HomeCard>
                        <HomeCard purpose="Illustration 1" className="bg-amber-200 absolute translate-x-10 -rotate-25 right-1/2 top-10 ">
                            <img src="/images/bg-ppl-text.jpg" alt="Illustration 1" className="object-cover h-full w-full overflow-hidden rounded-xl" />
                        </HomeCard>
                        <HomeCard purpose="Illustration 1" className="bg-fuchsia-500 absolute translate-x-60 translate-y-20  rotate-45 left-1/2 top-10">
                            <img src="/images/bg-ppl-text.jpg" alt="Illustration 1" className="object-cover h-full w-full overflow-hidden rounded-xl" />
                        </HomeCard>
                        <HomeCard purpose="Illustration 1" className="bg-orange-200 absolute translate-x-120 rotate-25 right-1/2 top-10 ">
                            <img src="/images/bg-ppl-text.jpg" alt="Illustration 1" className="object-cover h-full w-full overflow-hidden rounded-xl" />
                        </HomeCard>
                        
                        <HomeCard purpose="Illustration 1" className="bg-blue-200 absolute translate-x-1/2 right-1/2 top-10  ">
                            <img src="/images/bg-ppl-text.jpg" alt="Illustration 1" className="object-cover h-full w-full overflow-hidden rounded-xl" />
                        </HomeCard>
                </HomeCardWrapper>
                <div>
                    <button className="btn  h-fit w-fit" onClick={() => {
                        location.href = "/Material"
                    }}>
                        <h1 className="text-6xl p-6 text-black text-center">
                            Zum Material
                        </h1>
                    </button>
                </div>
            </div>
        </div>
    </>
}