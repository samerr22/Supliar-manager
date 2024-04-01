import React from "react";
import { Link } from "react-router-dom";
import Cat from "../img/cat.jpg";
import Fur from "../img/fur.jpg";

export default function Schedul() {
  return (
    <div className="h-[600px] relative"> {/* Added relative class */}
        <img src={Fur} alt="" className="w-full h-full object-cover" /> {/* Added object-cover class */}
        
        <div className="absolute top-48 left-1/2 transform -translate-x-1/2 z-10"> 
        <div className="bg-opacity-20 border shadow-xl bg-black rounded-xl">
          <p className="text-white   text-4xl font-serif ml-4  ">
            Submit you quotation
          </p>
          </div>
        </div>


      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-14 mt-5">
     
        
        <Link to="/supAdd">
          <button className="bg-blue-500 hover:bg-blue-700 text-4xl text-white font-serif py-2 px-4 rounded-full">Click Me</button> {/* Added Tailwind button styles */}
        </Link>
      </div>
    </div>
  );
}
