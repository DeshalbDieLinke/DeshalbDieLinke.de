
export default function HomeTile(props: {src: string, title: string, href: string, color: string, className?: string}) {


    return <div className={"card h-full hover:cursor-pointer hover:scale-105 hover:transition-transform  rounded-xl shadow-2xl flex shadow-gray-400 bg-white " + props.className}
                onClick={() => {
                    location.href = props.href;
                }}>
                <img
                    src={props.src}
                    alt={props.title}
                    className="object-fit h-full grow"
                />
                <div className={"h-20 w-full text-center flex items-center justify-center " + props.color}>
                    <p className="p-4 text-2xl font-black translate-y-2">{props.title}</p>
                </div>
        </div>
}