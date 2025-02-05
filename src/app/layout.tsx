"use client";

import Header from "@/components/Header";
import "../styles/global.css";
import Footer from "@/components/Footer";
import Globals from "@/components/Globals";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/consts";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {



    
    return (
        <html lang="en">


            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <link rel="icon" type="image/svg+xml" href="/images/icons/favicon.ico" />


            <title>{SITE_TITLE}</title>
            <meta name="title" content={SITE_TITLE} />
            <meta name="description" content={SITE_DESCRIPTION} />


            <body>
                <Globals>
                    <Header />
                    {children}
                    <Footer />
                </Globals>
            </body>
    </html>
    )
}