"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { KontaktKompakt } from "./Kontakt";

import * as Clerk from  "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";
import { Variable } from "lucide-react";

export default function Register() {

    function handleSubmit(e: any) { 
        e.preventDefault()

        const form = e.target
        const formdata = new FormData(form)
        const  email = formdata.get("email")
        const password = formdata.get("password")
        const  token = formdata.get("token") }


    return ( 
    <div >
    <div className="lg:flex flex-wrap">
        <div className="lg:w-1/2 lg:h-full bg-[var(--primary)] flex justify-center items-center md:p-12">
            <div className="m-12 flex flex-col items-center">
                <p className="text-white text-2xl font-black">Du willst mitmachen?</p>
                <p className="text-white">Melde dich gerne auf unserer Waitlist an und schreib uns! <br/> Verbände und Orgas sind immer Willkommen - für Alle haben wir leider die Kapazität nicht. </p>
                <KontaktKompakt iconSize={30} />
                <br></br>

            </div>
        </div>
        <div className="flex lg:w-1/2 min-h-full  justify-center items-center p-4">

            <Clerk.Waitlist fallback={"Netzwerk Problemchen. Hier sollte etwas sein"} />

        </div>
    </div>
    </div>
    )}
