interface TeamCardProps {
title: string, position?: string, description: string, image?: string, tag? : string,  website?: string, insta?: string, x?: string, tiktok?: string, facebook?: string, bluesky?: string, email?: string, fotosource?: string
}

export default function TeamCard(props: TeamCardProps) {
    return <>
        <div className="card bg-base-100 w-96 shadow-xl m-4">
            <figure>
            {(props.image != null) && <img src={props.image}/>}
            {(props.fotosource != null)&&<p className="absolute right-1 text-white text-[0.5rem] top-[1%]">{props.fotosource}</p>}
            </figure> 
            <div className="card-body">
                <h2 className="card-title">
                    <b>{props.title}</b>
                    
                    {(props.tag != null) && <div className="badge badge-secondary rounded-xl p-1">{props.tag}</div>}
                    
                </h2>
                <p className="text-left text-lg">
                    {(props.position != null) && props.position}<br />
                    <span
                        className="font-normal"
                        dangerouslySetInnerHTML={{
                            __html: props.description,
                        }}
                    />
                </p>
                <div className="card-actions justify-end">
                    {(props.insta != null) && <a href={props.insta} target="_blank"><img title="Instagram" src="/images/logos/instagram.svg" width="50" height="50" /></a> }
                    {(props.x != null) && <a href={props.x} target="_blank"><img title="X" src="/images/logos/x-logo.svg" width="50" height="50" /></a> }
                    {(props.tiktok != null) && <a href={props.tiktok} target="_blank"><img title="TikTok" src="/images/logos/tiktok.svg" width="50" height="50" /></a> }
                    {(props.facebook != null) && <a href={props.facebook} target="_blank"><img title="Facebook" src="/images/logos/facebook.svg" width="50" height="50" /></a> }
                    {(props.bluesky != null) && <a href={props.bluesky} target="_blank"><img title="BlueSky" src="/images/logos/bluesky.svg" width="50" height="50" /></a> }
                    {(props.website != null) && <a href={props.website} target="_blank"><img title="Website" src="/images/logos/website.svg" width="50" height="50" /></a> }
                    {(props.email != null) && <a href={props.email} target="_blank"><img title="Email" src="/images/logos/emailicon.svg" width="50" height="50" /></a> } 
                </div>
            </div>
        </div>
    </>
}
