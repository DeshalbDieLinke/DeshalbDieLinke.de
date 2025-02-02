import HomeCard from "./HomeCard"

export default function Homepage() {

    return <>
        <div className="h-full w-full p-12">
            <div className="flex flex-col items-center justify-center h-full gap-12 ">
                <div className="cards shadow-md">
                        <HomeCard purpose="Illustration 1" className="bg-green-200">
                            <img src="/images/bg-ppl-text.jpg" alt="Illustration 1" className="object-cover h-full w-full overflow-hidden rounded-xl" />
                        </HomeCard>
                </div>
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