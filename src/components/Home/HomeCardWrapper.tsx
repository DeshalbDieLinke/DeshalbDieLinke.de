export  default function HomeCardWrapper(props: {className: string,children: React.ReactNode}) {
    return <>
    <div className={"" + props.className}>
            {props.children}

        </div>
    </>
}