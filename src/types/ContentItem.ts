import { v4 as uuidv4 } from 'uuid';

class ContentItem {
    key: string = uuidv4();
    topics: string[];
    title: string;
    videoUrl?: string; 
    text?: string;
    imageUrl?: string;
    type: string;
    verified: boolean;
    image?: any;

    constructor(topics: string[], title: string, type: string, verified: boolean, content: string, image?: any) {
        this.topics = topics;
        this.title = title;
        this.type = type;
        this.verified = verified;
        switch (type) { 
            case "video": this.videoUrl = content;
            case "text": this.text = content;
            case "image": {
                this.imageUrl = content;
                this.image = image;
            }
        }
    }  
};

export default ContentItem;