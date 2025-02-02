export  default function HomeCardWrapper(props: {className: string,children: React.ReactNode}) {
    return <>
    <div className={"cards shadow-md h-[50rem] w-[40rem]  " + props.className}>
            {props.children}

        </div>
    </>
}