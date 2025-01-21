
export default function Footer() {
    return <> 
        <div className="text-center bg-grey-background p-4 bottom-0 w-full h-[4rem] mt-auto ">
            <div className="links flex justify-around flex-wrap">
                <a href="/Impressum" className="hover:text-primary text-black">Impressum</a>
                <a href="/Datenschutz" className="hover:text-primary text-black">Datenschutz</a>
                <a href="/about" className="hover:text-primary text-black">Unser Team</a>
            </div>
        </div>
    </>
}