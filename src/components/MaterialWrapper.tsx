"use client"
import React from 'react';
import { getContent } from '@/lib/db.ts';
import ContentDisplay from './NewContentDisplay.tsx';
import { useQuery } from '@tanstack/react-query';


export default function MaterialWrapper() {
    const { data: contentItems, error, isLoading } = useQuery({ queryKey: ['contentItems'], queryFn: getContent,
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false
     });
    if (isLoading) return <div className='flex justify-center items-center h-full p-8'><div className='loading loading-dots loading-lg'></div></div>;
    if (error) return <div><p>Fehler beim Laden des Materials: {error.message}</p></div>;
    if (!contentItems) return <div>Kein Material gefunden</div>;
    return (
        <ContentDisplay contentItems={contentItems} />
    );
}