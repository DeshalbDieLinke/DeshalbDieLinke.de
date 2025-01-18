export default function Hamburger() {
  return (
    <div className="sm:hidden block">
      <div className="flex flex-col">
        <a href="/">Home</a>
        <a href="/FAQ">FAQ</a>
        <a href="/Material">Material</a>
      </div>
    </div>
  );
}
