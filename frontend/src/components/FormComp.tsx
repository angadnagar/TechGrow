import { useState } from "react"
import { InputContainer } from "./InputContainer"
import axios from "axios"

import { SigninInput,SignupInput } from "@angad_nagar/blogs-common"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"

export const FormComp=({type}:{type:"signup" | "signin"})=>{
    
    const [postInputs,setPostInputs]=useState<SignupInput|SigninInput>({
        name:"",
        email:"",
        password:""
    })

    const navigate=useNavigate();

     const handleRequest=async ()=>{
        
        try{
        const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup" ? "signup" : "signin"}`,postInputs);

        const token=response.data.token;

        localStorage.setItem("token",token);
        
        navigate('/blogs');
        
        }
        catch(e){
          alert("Error");
        }
     }

    return <div className="h-screen pt-32 flex flex-col">
        
        <div className="flex justify-center">
            <div className="border-2 p-10 rounded-lg">
            <div className="px-10">
           <div className="text-2xl font-bold ">
            {type==="signup" ? "Create an account" : "Login to your account"}
           </div>
           <div className="text-gray-400 text-md">Enter your details to get started</div>
           </div>
           <div className="pt-4">
           {type==="signup" ? <InputContainer label="Name" placeholder="Angad Nagar" onChange={(e)=>{
              setPostInputs({
                ...postInputs,
                name:e.target.value
              })
           }} /> : null }

           <InputContainer label="Email" placeholder="angad@gmail.com" onChange={(e)=>{
                     setPostInputs({
                         ...postInputs,
                      email:e.target.value
                  })
              }} />

         <InputContainer type="password" label="Password" placeholder="123456" onChange={(e)=>{
                 setPostInputs({
                  ...postInputs,
                  password:e.target.value
                })
             }} />


                <button onClick={handleRequest} type="button" className="mt-4 w-full text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{type==="signup"?"Sign up" : "Sign in"}</button>

                
                <div className="text-gray-500">
                    {type==="signup"?"Already have an account?":"Dont have an account?"}
                    <Link className="pl-2 underline" to={type==="signup" ? "/signin" : "/signup"}>{type==="signup"? "Signin" :"Signup"}</Link>
                </div>
             </div>

         
          </div>
        </div>
    </div>
}