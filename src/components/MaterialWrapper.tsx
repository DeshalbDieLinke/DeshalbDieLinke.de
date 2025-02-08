
import React from 'react';
import ContentDisplay from './NewContentDisplay.tsx';
import { type ContentItem } from '@/types/ContentItem.ts';
import { getContent } from '@/lib/db.ts';

export default function MaterialWrapper() {
    const [content, setContent] = React.useState<ContentItem[]>([]);

    React.useEffect(() => { 
        
        getContent().then((res) => {
            if (res) {
                setContent(res);} 
        }
        );
    }, []);

    return (
        <ContentDisplay contentItems={content} />
    );
}