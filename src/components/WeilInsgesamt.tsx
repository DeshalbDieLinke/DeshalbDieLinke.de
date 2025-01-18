import Card from "./Card";
import Footer from "./Footer";

export default function WeilInsgesamt() { 
    return <div id="WeilInsgesamt" className="relative z-0 h-screen w-screen bg-white">
            <div className="flex items-center  h-full  flex-row justify-around flex-wrap">
                <Card title="Die Linke" description="Webseite von der Bundespartei Die Linke" image="/images/logos/Logo_Linke.png" action="Besuchen" tag="Offiziell" link="https://www.die-linke.de"/>
                <Card title="Material" description="Material von uns und der Partei zum Download" link="/Material" tag="Downloads" action="Besuchen" image="/images/sharepics/Klassenkampf/Klassenkampf.png"/>

            <Footer />
            </div>
        </div>
}