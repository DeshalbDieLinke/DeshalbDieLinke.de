import TeamCard from "./TeamCard";
import Footer from "./Footer";

export default function AboutUs() { 
    return <div className="h-full bg-white">

        
            <div className="flex items-center  h-full  flex-row justify-around flex-wrap">
                <TeamCard title="Eric Stehr" position="Stv. Vorsitzender vom Landesverband Sachsen-Anhalt. Fragen, Anregungen, Ideen und Presse: eric.stehr@dielinke-lsa.de" email="mailto:eric.stehr@dielinke-lsa.de" description="Stadtrat in Weißenfels" image="/images/mitwirkende/EricStehr.JPG" tag="Redakteur" insta="https://www.instagram.com/ericpolitikstuff/" x="https://x.com/EricStehr" facebook="https://www.facebook.com/EricRStehr" bluesky="https://bsky.app/profile/ericstehr.bsky.social" fotosource="Foto: Oliver Wiebe" />
                <TeamCard title="Nico Mirchandani" description="Mitglied des Landesverbandes Nordrhein-Westfalen, KV Bonn" tag="Programmierer" email="mailto:mail@nicomir.de" insta="https://www.instagram.com/nicomir02/"/>
                <TeamCard title="M. Wallace" description="Mitglied des Landesverbandes Baden-Württemberg, KV EM" email="mailto:demohstens@gmail.com" tag="Programmierer" insta="https://www.instagram.com/matt.demohstens/" bluesky="https://bsky.app/profile/demohstens.dev" website="https://demohstens.dev"/>
                <TeamCard title="Julian Kramer" description="Mitglied des Landesverbandes Berlin" email="mailto:me@mrbrowny.de" tag="Programmierer" website="https://mrbrowny.de"/>
            </div>
        </div>
}
