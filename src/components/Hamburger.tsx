import Link from 'next/link';

export default function Hamburger() {
  return (
    <div className="sm:hidden block">
      <div className="flex flex-col">
        <Link href="/">Home</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/material">Material</Link>
      </div>
    </div>
  );
}
