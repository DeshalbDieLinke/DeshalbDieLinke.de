import Image from 'next/image';
import banner from '../Images/banner.jpg';


export default function Banner() {
    return <div className="banner w-full flex flex-wrap xl:flex-nowrap" >
    <div className="banner ">
        <Image src={banner} alt="Banner"  />
        <div className="absolute quelle text-sm text-black font-light float-end">
            Bildquelle: Olaf Krostitz
        </div>
    </div>
    <div className="intro bg-primary p-10">
        <p className="text-4xl text-white font-black">
            Willkommen auf der Kampagnen-Seite <a className="no-underline text-white " href="https://x.com/search?q=%23deshalbdielinke"><strong className='text-white'>#DeshalbDieLinke</strong></a>.
        </p> 
        <p className='text-white'>Organisiert durch ehrenamtliche Basis-Mitglieder. Hier findet ihr eine breite Auswahl zu verschiedenen Themen, die begr&uuml;nden, weshalb man inmitten dieser politischen Krise im Land Die Linke w&auml;hlen sollte.  Ab jetzt hei&szlig;t es, &uuml;berall zu verschiedensten Themen mit dem Hashtag #DeshalbDieLinke Werbung f&uuml;r eine starke linke Partei zu machen.</p> 
        <p className='text-white'> Am 23. Februar: <strong>#DeshalbDieLinke</strong></p>
        <div className='flex flex-wrap gap-2'>
            <a download href="/images/DDL_Logos_und_Vorlagen.zip" className="btn my-4 text-white">Logos herunterladen</a>
            <a href="/register" className="btn my-4">Eigene Inhalte Hochladen</a>
            <a download href="/Wahlprogramm.pdf" className="btn text-black">Parteiprogramm runterladen</a>
        </div>
 


        </div>
    </div>

}