export default function BtnLink(props: {title: string, href: string}) {
    var style = {
        fontFamily: 'work sans',
    }
    return <>
        <a href={props.href} style={style} className="h-[3.5rem] rounded p-2 bg-primary hover:bg-tertiary text-white font-black hover:text-white flex justify-center text-center items-center w-full text-sm md:text-2xl">
            {props.title}
        </a>
    </>;
}