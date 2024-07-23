import { BlogProps } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./Avatar"

export const IndividualBlog=({blog}:{blog:BlogProps})=>{
    return <div>
        <Appbar/>
        <div className="flex justify-center">
    <div className="grid grid-cols-12 px-10 w-full max-w-screen-lg pt-10">
        <div className="col-span-8">
            <div className="text-4xl font-extrabold">
                {blog.title}
            </div>
            
            <div className="text-slate-400 pt-2">
                22 July 2024
            </div>
            <div className="pt-4">
                {blog.content}
            </div>
        </div>
        <div className="col-span-4">
             Author
            <div className="flex w-full pt-1">
                <div className="">
            <Avatar size="big" name={blog.author.name || "Anonymous"}/>
            </div>
            <div className="pl-2">
            <div className="text-xl font-bold">
                {blog.author.name || "Anonymous"}
            </div>
            

            <div className="pt-1 text-slate-400">Random text about the author that catch user attention</div>
            </div>
            </div>
            </div>
            
    </div>
    </div>
    </div>
}