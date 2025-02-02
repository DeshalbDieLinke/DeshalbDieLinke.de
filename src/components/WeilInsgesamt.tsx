import Card from "./Card";
import Footer from "./Footer";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default function WeilInsgesamt() { 
    return <div id="WeilInsgesamt" className="relative z-0 h-screen w-screen bg-white flex flex-col">
            <div className="flex justify-center items-center h-full">
                <Carousel className="max-w-[90%] h-full self-center" opts={{loop: true}}>
                    <CarouselPrevious />
                    <CarouselContent className=" h-[calc(100vh-4rem)] w-full p-5 pt-10 ">
                        <CarouselItem className="flex items-center flex-row justify-around flex-wrap h-full" key={0}>
                            <Card title="Die Linke" description="Webseite von der Bundespartei Die Linke" image="/images/logos/Logo_Linke.png" action="Besuchen" tag="Offiziell" link="https://www.die-linke.de"/>
                            <Card title="Material" description="Material von uns und der Partei zum Download" link="/Material" tag="Downloads" action="Besuchen" image="/images/sharepics/Klassenkampf/Klassenkampf.png"/>
                            <Card title="Wahlprogramm" description="Das Kurzwahlprogramm der Partei Die Linke" link="/Wahlprogramm.pdf" tag="Programm" action="Herunterladen" image="/images/logos/Logo_Linke.png"/>
                        </CarouselItem>
                        <CarouselItem className=" h-full flex justify-center items-center" key={1}>
                            <p>Hier kommt bald mehr. Versprochen :)</p>
                        </CarouselItem>
                        <CarouselItem className=" h-full w-fit flex flex-col justify-center items-center shadow-sm border border-gray-" key={2}>
                            <h3> Hier ein Video :) </h3>
                            <video className="" src="src/Images/videos/TT_LVSA_Kugel_Geben_Schnell.mov" autoPlay loop muted />
                            <p className="text-wrap w-[50%]"> Hier geht es um inhalte: Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique ratione nulla sequi tenetur voluptatibus, aliquam ex ab esse modi iusto.
                            </p>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselNext />
                </Carousel>
            </div>
            <Footer />
        </div>
}