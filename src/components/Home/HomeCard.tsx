

export default function HomeCard(props: {purpose: string, children: React.ReactNode, className?: string}) {


    return <>
        <div className={`card h-[45rem] w-[35rem] p-4 rounded-xl shadow-2xl shadow-gray-700 ${props.className}`}>
            {props.children}
        </div>
    </>
}