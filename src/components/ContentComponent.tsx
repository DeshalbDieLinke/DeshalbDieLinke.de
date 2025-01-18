import { Image } from "astro:assets";
import ContentItem from "../types/ContentItem";

export default function ContentItemComponent(props: { item: ContentItem, clickCallback: (item: ContentItem) => void }) {
    const item = props.item;
    const image = props.item.image ? Image(props.item.image) : null;

    return (
        <button
            className="contentItem relative flex flex-col rounded-md border border-black border-outset p-4 bg-white no-underline"
            onClick={() => { props.clickCallback(item); }}
        >
            {/* Verified Label */}
            {item.verified && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-9">
                    <img src="/images/icons/verified.svg" alt="Offizell" width="20" height="20" />
                </div>
            )}

            {/* Content */}
            {item.type === "video" && <video src={item.videoUrl} />}
            {item.type === "text" && <p>{item.text}</p>}
            {item.type === "image" && item.imageUrl && <img loading="lazy" src={item.imageUrl} alt="Sharepic" />}
        </button>
    );
}
