export default function Card(props: {image: string, tag? : string,  action?: string, link: string}) {
    return <>
        <div className="card bg-base-100 shadow-xl m-4">
            <figure>
            <img className=""
                src={props.image}
                alt="" />
            </figure>
            <div className="card-body">
            <h2 className="card-title">
                {(props.tag != null) && <div className="badge badge-secondary">{props.tag}</div>}
                
            </h2>
            <div className="card-actions justify-end">
            {(props.action != null && props.link != null) && <a href={props.link} className="btn btn-primary w-full rounded-md"><p className="text-white">{props.action}</p></a> }
    
            </div>
            </div>
        </div>
    </>
}