import { motion } from "framer-motion";
import Image from "next/image";

export default function Banner() {
    return <div className="banner w-full h-fit flex flex-wrap lg:flex-nowrap" >
    <div className="banner bg-accent md:max-w-[40vw] h-[300px] md:h-auto flex-shrink-0 w-full">
        {/* Desktop version */}
        <motion.div 
                layoutId="main-image" 
                className="relative w-full h-full hidden md:block"
                transition={{
                    ease: "easeOut",
                    duration: 0.1,
                }}
                >
            <Image 
                src="https://ddl.fra1.cdn.digitaloceanspaces.com/Banner.jpg"
                alt="Banner" 
                fill
                className="object-cover z-10"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
                onError={(e) => {
                    console.error('Image failed to load:', e);
                }}
                onLoad={() => {
                    console.log('Image loaded successfully');
                }}
                />
        </motion.div>
        {/* Mobile version */}
        <motion.div 
                layoutId="main-image-mobile" 
                className="relative w-full h-full lg:hidden"
                transition={{
                    ease: "easeOut",
                    duration: 0.1,
                }}
                >
            <Image 
                src="https://ddl.fra1.cdn.digitaloceanspaces.com/Banner.jpg"
                alt="Banner" 
                fill
                className="object-cover z-10"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
                onError={(e) => {
                    console.error('Image failed to load:', e);
                }}
                onLoad={() => {
                    console.log('Image loaded successfully');
                }}
                />
        </motion.div>
    </div>
    <motion.div className="intro bg-accent p-6 relative "
    layoutId="accent-background-mobile"
    transition={{
        type: 'spring',
        bounce: 0.2,
        ease: "easeInOut",
        duration: 0.2,
    }}
    style={{
        position: 'relative',
        transformOrigin: 'top'
    }}>

        <div className="absolute left-0 bottom-0 quelle float-end p-2 bg-black rounded-tr-md">
            <p className=' text-xs text-white font-light mr-px' style={{marginBottom: '0'}}>
                Bildquelle: Olaf Krostitz
            </p>
        </div>

        <p className="text-3xl text-white font-black">
            Willkommen auf der Kampagnen-Seite <a className="no-underline text-white " href="https://x.com/search?q=%23deshalbdielinke"><strong className='text-white'>#DeshalbDieLinke</strong></a>.
        </p> 
        <p className='text-white'>Organisiert durch ehrenamtliche Basis-Mitglieder. Hier findet ihr eine breite Auswahl An Sharepics, die ihr gerne mit dem Hashtag #DeshalbDieLinke teilem könnt, um Werbung f&uuml;r eine starke linke Partei zu machen.</p> 
        <p className='text-white'> Am 23. Februar: <strong>#DeshalbDieLinke</strong></p>
        <div className='size-auto content-center self-center'>
            <div className='flex flex-wrap  justify-evenly '>
                <a download href="https://ddl.fra1.cdn.digitaloceanspaces.com/DDL_Logos_und_Vorlagen.zip" className="btn border-none my-1 bg-white ">
                    <p className="translate-y-2">Logos & Vorlagen herunterladen</p></a>
                <a href="/register" className="btn border-none bg-white my-2">
                    <p className="translate-y-2">Eigene Inhalte Hochladen</p></a>
                <a download href="https://ddl.fra1.cdn.digitaloceanspaces.com/Wahlprogramm.pdf" className="btn border-none text-black border none bg-white my-">
                    <p className="translate-y-2"> Parteiprogramm runterladen</p></a>
                    </div>
        </div>
        </motion.div>
    </div>

}