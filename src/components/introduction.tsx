export default function Introduction() { 
    let imgList = [
        "https://jacobin.de/_next/image?url=https%3A%2F%2Fapi.jacobin.de%2Fuploads%2Fimago473275527_12d70b4f7f.jpg&w=3840&q=75",
        "images/kms.jpg",
        "images/bg-ppl-text.jpg"
    ];
    return <section className="relative w-screen h-full ">
    <img src={imgList[Math.floor(Math.random() * imgList.length)]} alt="Your image" className="filter h-full  md:w-full object-cover md:fit blur sm:blur-sm " />
    <div className="absolute inset-0 bg-red-500 bg-opacity-50 h-full flex items-center flex-col justify-evenly">
        <h1 className="text-white h-[60%] text-center text-[4rem] sm:text-7xl md:text-[8rem] xl:text-[13rem] font-black  md:leading-tight p-10">WESHALB DIE LINKE?</h1>
        <a href="#WeilMiete"><img src="/images/icons/double-arrow-down.svg" className="w-20 h-20 sm:w-20 sm:h-20 md:w-30 md:h-30 lg:w-40 lg:h-40 animate-jitter" /></a>
    </div>
    </section>
} 

// text-6xl xl:p-5 xl:text-[16rem] md:text-[8rem] sm:text-8xl