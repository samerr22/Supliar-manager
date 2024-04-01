import { buildCreateSlice } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [shadul, setshadul] = useState([]);
  const [FormToDelete, setFormToDelete] = useState("");

  console.log(FormToDelete);

  useEffect(() => {
    const fetform = async () => {
      try {
        const res = await fetch(`/api/form/getform`);
        const data = await res.json();

        if (res.ok) {
          setshadul(data.shadul);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetform();
    }
  }, [currentUser._id]);





  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `/api/form/deleteform/${FormToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setshadul((prev) =>
          prev.filter((sup) => sup._id !== FormToDelete)
        );
       
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  



   




  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
     
     <div className="flex justify-center items-center mt-5 mb-4">
     {currentUser.isAdmin &&(
      <Link  to={"/sign-up"}>
        <button className=" w-48 h-8 rounded-lg bg-blue-600 text-white ">Add new supliar</button>
        </Link>
      )}


     </div>
      
      {currentUser.isAdmin ? (
        <>
          <table className="w-full divide-y divide-gray-200 shadow-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                company name 
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                 Email 
                </th>
                
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                 Phone 
                </th>
               
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                 Type 
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Desicription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {shadul.map((sup) => (
                <tr
                  key={sup._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{sup.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{sup.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{sup.phone}</td>
                
                  <td className="px-6 py-4 whitespace-nowrap">
                    {sup.image.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Image ${index + 1}`}
                        className="w-16 h-16 gap-2 object-cover mr-2"
                      />
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{sup.type}</td>
                  <td className="px-6 py-4  max-w-[100px] font-extralight break-words">
                    {sup.Description}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap ">
                    <button
                      onClick={() => {
                        setFormToDelete(sup._id);
                        handleDeleteUser();
                      }}
                      className="text-white hover:underline cursor-pointer rounded-lg w-20  bg-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>You have no users yet!</p>
      )}
    </div>
  );
}
