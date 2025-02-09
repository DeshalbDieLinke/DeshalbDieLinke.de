"use client";
// src/app/material/page.tsx
import Banner from "@/components/banner";
import MaterialWrapper from "@/components/MaterialWrapper";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()


export default function Material() {



    return (
        <main className="bg-gray-100">
            <Banner />
            <QueryClientProvider client={queryClient}>
                <MaterialWrapper />              
            </QueryClientProvider>
        </main>
    );
}
