import { KontaktKompakt } from "./Kontakt.tsx";
import { ProfileLink } from "./Links.tsx";

export default function Footer(props: {className?: string}) {
    return <> 
        <div className={props?.className}>
            <div className="links flex justify-between flex-wrap gap-2 md:gap-12">
                <a href="/impressum" className="hover:text-primary text-black">Impressum</a>
                <a href="/datenschutz" className="hover:text-primary text-black">Datenschutz</a>
                <a href="https://mehrvomlohn.de" className="hover:text-primary text-black">MehrVomLohn.de</a>
                
                <a href="/about" className="hover:text-primary text-black">Unser Team</a>
                <a href="/tos" className="hover:text-primary text-black">Nutzungsbedingungen</a>

                <ProfileLink />
            </div>
            <KontaktKompakt iconSize={30} />

        </div>
    </>
}