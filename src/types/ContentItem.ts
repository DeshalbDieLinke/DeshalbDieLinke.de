export { ContentItemClass, type ContentItem, ContentType };


class ContentItemClass {
    ID: number;
    topics: string[];
    title: string;
    videoUrl?: string; 
    text?: string;
    imageUrl?: string;
    type: string;
    verified: boolean;
    autherID?: number;

    constructor(
        ID: number,
        topics: string[],
        title: string,
        type: string,
        verified: boolean,
        content: string,
        imageURL?: any,
        autherID?: number
    ) {
        this.ID = ID;
        this.topics = topics;
        this.title = title;
        this.type = type;
        this.verified = verified;
        this.autherID = autherID;

        switch (type) { 
            case "video":
                this.videoUrl = content;
                break;
            case "text":
                this.text = content;
                break;
            case "image":
                this.imageUrl = this.imageUrl;
                break;
        }
    }
}

enum ContentType { 
    Video = "video",
    Text = "text",
    Image = "image"
}

interface ContentItem {
    id: number;
    topics: string[];
    title: string;
    description?: string;
    altText?: string;
    url?: string;
    type: ContentType;
    official: boolean;
    autherID?: number;
}