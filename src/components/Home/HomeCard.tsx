

export default function HomeCard(props: {purpose: string, children: React.ReactNode, className?: string}) {


    return <>
        <div className={`card h-[35rem] w-[24rem] p-4 rounded-xl shadow-2xl flex shadow-gray-700 ${props.className}`}>
            {props.children} 
        </div>
    </>
}