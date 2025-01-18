import TeamCard from "./TeamCard";
import Footer from "./Footer";

export default function AboutUs() { 
    return <div className="h-full bg-white">

        
            <div className="flex items-center  h-full  flex-row justify-around flex-wrap">
                <TeamCard title="Eric Stehr" position="Stv. Vorsitzender vom Landesverband Sachsen. Fragen, Anregungen, Ideen und Presse: eric.stehr@dielinke-lsa.de" email="mailto:eric.stehr@dielinke-lsa.de" description="Stadtrat in Weißenfels" image="/images/mitwirkende/EricStehr.JPG" tag="Redakteur" insta="https://www.instagram.com/ericpolitikstuff/" x="https://x.com/EricStehr" facebook="https://www.facebook.com/EricRStehr" bluesky="https://bsky.app/profile/ericstehr.bsky.social"/>
                <TeamCard title="Nico Mirchandani" description="Mitglied des Landesverbandes Nordrhein-Westfalen, KV Bonn" tag="Programmierer" email="mailto:mail@nicomir.de" insta="https://www.instagram.com/nicomir02/"/>
                <TeamCard title="Matu Wallace" description="Mitglied des Landesverbandes Baden-Württemberg, KV EM" email="mailto:wallacematu@gmail.com" tag="Programmierer" insta="https://www.instagram.com/matt.demohstens/" bluesky="https://bsky.app/profile/demohstens.dev" website="https://demohstens.dev"/>
                <TeamCard title="Julian Kramer" description="Linker Programmierer aus Berlin" tag="Programmierer" email="mailto:me@mrbrowny.de"/>
            </div>
        </div>
}
