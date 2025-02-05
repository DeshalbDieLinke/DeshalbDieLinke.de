const links = {
    "insta": "https://www.instagram.com/deshalbdielinke.de/",
    "webseite": "https://deshalbdielinke.de/",
    "x": "https://x.com/deshalbdielinke",
    "bsky": "https://bsky.app/profile/deshalbdielinke.de",
    "github": "https://github.com/DeshalbDieLinke",
    "email": "mailto:eric.stehr@dielinke-lsa.de",
}


export function KontaktKompakt(props: {className?: string, iconSize?: number}) { 
    const iconSize = props.iconSize || 50;
    return <>
        <div className="flex gap-2 m-2">
            <a href={links["insta"]} target="_blank"><img title="Instagram" src="https://ddl.fra1.cdn.digitaloceanspaces.com/Logos/instagram.svg" width={iconSize} height={iconSize} /></a> 
            <a href={links["x"]} target="_blank"><img title="X" src="https://ddl.fra1.cdn.digitaloceanspaces.com/Logos/x-logo.svg" width={iconSize} height={iconSize} /></a> 
            <a href={links["github"]} target="_blank"><img title="Github" src="https://ddl.fra1.cdn.digitaloceanspaces.com/Logos/github.svg" width={iconSize} height={iconSize} /></a> 
            {/* <a href={links["tiktok"]} target="_blank"><img title="TikTok" src="/images/logos/tiktok.svg" width={iconSize} height={iconSize} /></a>  */}
            {/* <a href={links["facebook"]} target="_blank"><img title="Facebook" src="/images/logos/facebook.svg" width={iconSize} height={iconSize} /></a>  */}
            <a href={links["bsky"]} target="_blank"><img title="BlueSky" src="https://ddl.fra1.cdn.digitaloceanspaces.com/Logos/bluesky.svg" width={iconSize} height={iconSize} /></a> 
            <a href={links["webseite"]} target="_blank"><img title="Website" src="https://ddl.fra1.cdn.digitaloceanspaces.com/Logos/website.svg" width={iconSize} height={iconSize} /></a> 
            <a href={links["email"]} target="_blank"><img title="Email" src="https://ddl.fra1.cdn.digitaloceanspaces.com/Logos/emailicon.svg" width={iconSize} height={iconSize} /></a> 
        </div>
    </>
}