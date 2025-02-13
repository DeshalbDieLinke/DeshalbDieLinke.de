

/**
 * A card used for the shuffle-cards on the home page.
 * @param props 
 * @returns 
 */
export default function HomeCard(props: {purpose: string, children: React.ReactNode, className?: string, onClick?: () => void}) {

    return <>
        <div className={`absolute hover:scale-105 hover:cursor-pointer hover:transition-transform  h-[35rem] w-[24rem] rounded-xl shadow-2xl flex shadow-gray-700 left-1/2 bottom-1/2 
                -translate-x-1/2 translate-y-1/2 ${props.className}`}
                onClick={props.onClick ?? (() => {
                    location.href = props.purpose;
                })}    
            >
            {props.children} 
        </div>
        
    </>
}