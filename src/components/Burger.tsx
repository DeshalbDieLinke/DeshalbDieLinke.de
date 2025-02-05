import Link from 'next/link';

export default function Burger() {
    return <>
        <div >
            <div className="flex flex-col">
                <Link href="/">Home</Link>
                <Link href="/FAQ">FAQ</Link>
                <Link href="/Material">Material</Link>
            </div>
       </div>
    </>;
}