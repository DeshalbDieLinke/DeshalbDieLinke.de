

export default function HomeCard(props: {purpose: string, children: React.ReactNode, className?: string}) {


    return <>
        <div className={`absolute hover:scale-105  hover:transition-transform  h-[35rem] w-[24rem] p-4 rounded-xl shadow-2xl flex shadow-gray-700 left-1/2 bottom-1/2 
                -translate-x-1/2 translate-y-1/2 ${props.className}`}>
            {props.children} 
        </div>
        
    </>
}