import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { IndividualBlog } from "../components/IndividualBlog";
import { Skeleton } from "../components/Skeleton";
import { Appbar } from "../components/Appbar";

export const Blog = ()=>{
  const {id}=useParams();
  const {loading,blog}=useBlog({id:id || ""})

  if(loading){
    return <div>
        <Appbar/>
       <div className="flex justify-center">
      <Skeleton/>
    </div>
    </div>
  }

   return <div>
      <IndividualBlog blog={blog}/>
   </div>
  }