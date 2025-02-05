

export default function Banner() {
    return <div className="banner w-full h-fit flex flex-wrap lg:flex-nowrap" >
    <div className="banner bg-accent lg:max-w-[40vw] flex">
        <img src={"https://ddl.fra1.cdn.digitaloceanspaces.com/Banner.jpg"} alt="Banner" className="h-full object-cover" />
    </div>
    <div className="intro bg-primary p-10 relative">
    <div className="absolute left-0 top-0 quelle float-end p-2">
            <p className=' text-xs text-white font-light '>
                Bildquelle: Olaf Krostitz
            </p>
        </div>
        <p className="text-4xl text-white font-black">
            Willkommen auf der Kampagnen-Seite <a className="no-underline text-white " href="https://x.com/search?q=%23deshalbdielinke"><strong className='text-white'>#DeshalbDieLinke</strong></a>.
        </p> 
        <p className='text-white'>Organisiert durch ehrenamtliche Basis-Mitglieder. Hier findet ihr eine breite Auswahl An Sharepics, die ihr gerne mit dem Hashtag #DeshalbDieLinke teilem könnt, um Werbung f&uuml;r eine starke linke Partei zu machen.</p> 
        <p className='text-white'> Am 23. Februar: <strong>#DeshalbDieLinke</strong></p>
        <div className='flex flex-wrap gap-2'>
            <a download href="https://ddl.fra1.cdn.digitaloceanspaces.com/DDL_Logos_und_Vorlagen.zip" className="btn my-4 text-white">Logos & Vorlagen herunterladen</a>
            <a href="/register" className="btn my-4">Eigene Inhalte Hochladen</a>
            <a download href="https://ddl.fra1.cdn.digitaloceanspaces.com/Wahlprogramm.pdf" className="btn text-black my-4">Parteiprogramm runterladen</a>
        </div>
 


        </div>
    </div>

}