
import React from 'react';
import ContentDisplay from './NewContentDisplay.tsx';
import {ContentType} from '../types/ContentItem.ts';
import {DDL} from '@/lib/DDL.ts';
import { type ContentItem } from '@/types/ContentItem.ts';

export default function MaterialWrapper() {
    const [contentItems, setContentItems] = React.useState<ContentItem[]>([]);

    React.useEffect(() => { 
        DDL.GetContentItems((materials) => {
            setContentItems(materials);
        });
        // for local testing
        // setContentItems([{id: 0, topics: ["test"], title: "BlaBla", url: "https://www.tierschutzbund.de/fileadmin/_processed_/d/1/csm_Katzen_auf_Seite_liegend_getigert_c_dtschb-sabine-muench.de_2e70d12553.jpg", type: ContentType.Image, official: true, autherID: "0"}]);
    }, []);

    return (
        <ContentDisplay contentItems={contentItems} />
    );
}
