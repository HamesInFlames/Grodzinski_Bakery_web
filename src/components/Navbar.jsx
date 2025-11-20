import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 grid grid-cols-3 items-center">

        {/* LEFT — LOGO */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold tracking-wide leading-tight">
            GRODZINSKI
            <span className="block text-xs tracking-widest text-amber-600">
              BAKERY
            </span>
          </h1>
        </div>

        {/* CENTER — LINKS */}
        <ul className="hidden md:flex justify-center space-x-10 text-lg font-medium text-gray-700">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? "text-amber-600 font-semibold" : "hover:text-amber-600"
            }
          >
            Home
          </NavLink>

          <NavLink 
            to="/menu"
            className={({ isActive }) => 
              isActive ? "text-amber-600 font-semibold" : "hover:text-amber-600"
            }
          >
            Menu
          </NavLink>

          <NavLink 
            to="/catering"
            className={({ isActive }) => 
              isActive ? "text-amber-600 font-semibold" : "hover:text-amber-600"
            }
          >
            Catering
          </NavLink>

          <NavLink 
            to="/locations"
            className={({ isActive }) => 
              isActive ? "text-amber-600 font-semibold" : "hover:text-amber-600"
            }
          >
            Locations
          </NavLink>

          <NavLink 
            to="/about"
            className={({ isActive }) => 
              isActive ? "text-amber-600 font-semibold" : "hover:text-amber-600"
            }
          >
            About
          </NavLink>

          <NavLink 
            to="/contact"
            className={({ isActive }) => 
              isActive ? "text-amber-600 font-semibold" : "hover:text-amber-600"
            }
          >
            Contact
          </NavLink>
        </ul>

        {/* RIGHT — MOBILE ICON */}
        <div className="flex justify-end md:hidden">
          <button className="text-3xl text-gray-700">
            <AiOutlineMenu />
          </button>
        </div>

      </div>
    </nav>
  );
}
