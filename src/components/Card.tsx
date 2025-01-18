export default function Card(props: {title: string, description: string, image: string, tag? : string,  action?: string, link: string}) {
    return <>
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
            <img
                src={props.image}
                alt="" />
            </figure>
            <div className="card-body">
            <h2 className="card-title">
                {props.title}
                {(props.tag != null) && <div className="badge badge-secondary">{props.tag}</div>}
                
            </h2>
            <p>{props.description}</p>
            <div className="card-actions justify-end">
             {(props.action != null && props.link != null) && <a href={props.link} className="btn btn-primary">{props.action}</a> }
    
            </div>
            </div>
        </div>
    </>
}