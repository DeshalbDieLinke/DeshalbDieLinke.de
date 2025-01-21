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
                <Carousel className="max-w-full h-full self-center" opts={{loop: true}}>
                    <CarouselPrevious />
                    <CarouselContent className=" h-[calc(100vh-4rem)] w-full">
                    <CarouselItem className="flex items-center flex-row justify-around flex-wrap h-full" key={0}>
                        <Card title="Die Linke" description="Webseite von der Bundespartei Die Linke" image="/images/logos/Logo_Linke.png" action="Besuchen" tag="Offiziell" link="https://www.die-linke.de"/>
                        <Card title="Material" description="Material von uns und der Partei zum Download" link="/Material" tag="Downloads" action="Besuchen" image="/images/sharepics/Klassenkampf/Klassenkampf.png"/>
                        <Card title="Wahlprogramm" description="Das Kurzwahlprogramm der Partei Die Linke" link="/Wahlprogramm.pdf" tag="Programm" action="Herunterladen" image="/images/logos/Logo_Linke.png"/>
                    </CarouselItem>
                        <CarouselItem className=" h-full" key={1}>

                        </CarouselItem>
                    </CarouselContent>
                    <CarouselNext />
                </Carousel>
            </div>
            <Footer />
        </div>
}