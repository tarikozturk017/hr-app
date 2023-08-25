// import { Link } from "react-router-dom";
import Link from "next/link";

const Navbar = ({ setIsFormPage }) => {
  return (
    <nav className="bg-blue-600 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-semibold">Magnify Access</div>
        <ul className="flex space-x-4">
          <li
            className=" hover:cursor-pointer"
            onClick={() => setIsFormPage(true)}
          >
            <span href="/" className="text-white hover:text-blue-200">
              Form Page
            </span>
          </li>
          <li
            className=" hover:cursor-pointer"
            onClick={() => setIsFormPage(false)}
          >
            <span href="/lookup" className="text-white hover:text-blue-200">
              HR Lookup
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
