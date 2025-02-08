
import React from 'react';
import ContentDisplay from './NewContentDisplay.tsx';
import {DDL} from '@/lib/DDL.ts';
import { type ContentItem } from '@/types/ContentItem.ts';
import { getContent } from '@/lib/db.ts';

export default function MaterialWrapper() {
    const [contentItems, setContentItems] = React.useState<ContentItem[]>([]);
    const [newContentItems, setNewContentItems] = React.useState<ContentItem[]>([]);

    React.useEffect(() => { 
        DDL.GetContentItems((materials) => {
            setContentItems(materials);
        });
        getContent().then((res) => {
            if (res) {
            setNewContentItems(res);} 
        }
        );
    }, []);

    return (
        <ContentDisplay contentItems={contentItems.concat(newContentItems)} />
    );
}