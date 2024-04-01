import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {  signoutSuccess } from "../redux/user/userSilce";

export default function () {
  const {currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(currentUser)



  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-slate-100">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold ">Furniture</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/supAdd">
            <li>new Supliar</li>
          </Link>
          
            

          {currentUser &&   currentUser.isAdmin && (
          <Link to={'/View'}>
            <li
            
            
            >
            View new sup
            </li>
          </Link>
        )}
          
         

            {currentUser ? (
               <span onClick={handleSignout} className='cursor-pointer'>
               Sign Out
             </span>
            
               )
           
            :(
              <Link to="/sign-in" >
              <li>Sing In</li>
              </Link>
            )}
            
        
        </ul>
      </div>
    </div>
  );
}