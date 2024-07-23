import axios from "axios"
import { Appbar } from "../components/Appbar"
import { Textarea } from "../components/Textarea"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish=()=>{
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");

  const navigate=useNavigate();


    return <div>
        <Appbar/>
      <div className="flex justify-center w-full pt-8">
        <div className="w-full max-w-screen-lg">
      <input onChange={(e)=>{
        setTitle(e.target.value)
      }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title"/> 
        <Textarea onChange={(e)=>{
          setDescription(e.target.value)
        }}/>

        <button onClick={async ()=>{
          const response=await axios.post(`${BACKEND_URL}/api/v1/blog`,{
            title,
            content:description
          },{
            headers:{
              Authorization:"Bearer " + localStorage.getItem("token")
            }
          });

          navigate(`/blog/${response.data.blogId}`);

        }} type="submit" className="mt-2 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800">
       Publish post
     </button>
         </div>
         </div>
         </div>
}