//src\components\Navbar.jsx
export default function Navbar() {
  console.log("NAVBAR RENDERED ✅");

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-wide">
          Grodzinski Bakery
        </h1>
        
        <ul className="hidden md:flex space-x-10 text-lg font-medium text-gray-700">
          <li>Home</li>
          <li>Baked Goods</li>
          <li>Holidays</li>
          <li>Wholesale</li>
          <li>Catering</li>
          <li>About Us</li>
          <li>Contact</li>
        </ul>

        <button className="md:hidden text-3xl">☰</button>
      </div>
    </nav>
  );
}
