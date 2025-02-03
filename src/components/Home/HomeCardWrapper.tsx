export  default function HomeCardWrapper(props: {className: string,children: React.ReactNode}) {
    return <>
    <div className={"cards h-full w-full relative" + props.className}>
            {props.children}

        </div>
    </>
}