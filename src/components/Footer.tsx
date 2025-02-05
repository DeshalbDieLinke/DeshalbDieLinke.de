import { KontaktKompakt } from "./Kontakt.tsx";
import { ProfileLink } from "./Links.tsx";

export default function Footer() {
    return <> 
        <div className="text-center bg-grey-background p-4 bottom-0 w-full footer footer-center mt-auto bg-grey-400 flex flex-col">
            <div className="links flex justify-between flex-wrap gap-12">
                <a href="/impressum" className="hover:text-primary text-black">Impressum</a>
                <a href="/datenschutz" className="hover:text-primary text-black">Datenschutz</a>
                <a href="https://mehrvomlohn.de" className="hover:text-primary text-black">MehrVomLohn.de</a>
                <a href="/about" className="hover:text-primary text-black">Unser Team</a>
                <ProfileLink />
            </div>
            <KontaktKompakt />

        </div>
    </>
}