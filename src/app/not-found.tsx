import Link from "next/link";

export default function NotFound() {
    return <div className="flex flex-col items-center justify-center h-screen ">
        <h1 className="text-4xl font-bold">404 - Seite nicht gefunden</h1>
        <p className="text-lg">Diese Seite existiert nicht.</p>

        <p>Verirrt? <Link href="/">Zurück zur Homepage</Link></p>
    </div>;
}