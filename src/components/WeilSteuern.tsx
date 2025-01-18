import BtnLink from "./btnlink"
import SteuernChart from "./SteuernChart"

export default function WeilSteuern() { 
    return <>
    <div id="WeilSteuern" className="relative z-0 w-full  md:h-full flex flex-col justify-center">
        <div className="headerdiv flex-grow flex flex-col justify-center items-center bg-quaternary">
        <h1 className="text-center text-3xl xl:text-6xl p-5  text-white font-black " >Reichtum gerecht verteilen</h1>

        </div>
        <div className=" ">
            <SteuernChart />

        </div>
        <p className="font-light text-sm"> Quelle: <a href="https://www.zew.de/fileadmin/FTP/ZEWKurzexpertisen/ZEW_Kurzexpertise2105.pdf">ZEW</a> über <a href="https://de.statista.com/statistik/daten/studie/1256030/umfrage/veraenderung-des-einkommens-durch-die-wahlprogramme/"> Statista</a></p>

    </div>
    </>
}