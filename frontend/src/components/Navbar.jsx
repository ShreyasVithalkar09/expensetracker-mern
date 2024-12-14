import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth()
  return (
    <div className="navbar bg-neutral text-neutral-content shadow-md mb-6">
      <div className="flex-1 justify-between">
        <a className="btn btn-ghost normal-case text-xl">Expense Tracker</a>
       {
        user && <div className="flex space-x-4 mr-6">
         <Link to="/" className="btn btn-outline">
          Home
        </Link>
        <Link to="/profile" className="btn btn-outline ">
          Profile
        </Link>
        </div>
       }
      </div>

       

    </div>
  );
}

export default Navbar;
