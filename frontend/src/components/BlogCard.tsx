import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"

interface BlogCardProps{
    id:string,
    authorName:string,
    title:string,
    content:string,
    publishedDate:string
}
export const BlogCard=({id,authorName,title,content,publishedDate}:BlogCardProps)=>{

    return  <Link to={`/blog/${id}`}>

    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
            <div className="flex justify-center flex-col">
            <Avatar name={authorName}/>
            </div>
            <div className="flex pl-1 text-sm">{authorName} <h3 className="pl-1 text-slate-400 ">&#x2022;</h3> </div>  
            <div className="pl-1 font-thin text-slate-600 text-sm ">
            {publishedDate}
            </div>

            </div>
        
        <div className="pt-2 text-xl font-semibold">{title}</div>

        <div className="text-md font-light">{content.slice(0,100) + "..." }</div>

        <div className="pt-4 text-slate-400 text-sm font-thin">
            {`${Math.ceil(content.length/100)} min read`}
        </div>

    </div>
    
    </Link>
}