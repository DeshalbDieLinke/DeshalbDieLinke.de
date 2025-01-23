

export default function AltertDiv(props: { message: string, severiy: "error" | "info" | "warning" | null}) {
    return <>
        <div className="bg-red-500 text-white p-4 absolute bottom-12 rounded-md">
            {props.message}


        </div>
    </>

}