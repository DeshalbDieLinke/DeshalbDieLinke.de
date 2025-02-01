
import React from 'react';
import ContentDisplay from './NewContentDisplay.tsx';
import {DDL} from '@/lib/DDL.ts';
import { type ContentItem } from '@/types/ContentItem.ts';

export default function MaterialWrapper() {
    const [contentItems, setContentItems] = React.useState<ContentItem[]>([]);

    React.useEffect(() => { 
        DDL.GetContentItems((materials) => {
            setContentItems(materials);
        });
    }, []);

    return (
        <ContentDisplay contentItems={contentItems} />
    );
}