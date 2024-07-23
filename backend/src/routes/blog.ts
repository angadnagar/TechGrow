import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogSchema,updateBlogSchema } from "@angad_nagar/blogs-common";


export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables:{
        userId:string
    }
}>();

//middleware
blogRouter.use('/*',async (c,next)=>{
    const header=c.req.header("authorization") || "";
    // Bearer token
    const token=header.split(" ")[1];
    try{
    const response=await verify(token,c.env.JWT_SECRET);
  
    if(response){
        c.set("userId",response.id)
       await next();
    }
  
    else{
      c.status(403);
      c.json({
        error:"unauthorized"
      })
    }
 
}
catch(e){
    c.status(403);
    return c.json({
        message:"you are not logged in"
    })
}

  })
  

blogRouter.post('/',async (c)=>{

  const body=await c.req.json();

  const { success }=createBlogSchema.safeParse(body);

  if(!success){
    c.status(403);
    return c.json({
      message:"incorrect inputs"
    })
  }
    const authorId=c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    

     
      const blog=await prisma.blog.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:authorId
        }
      })

      return c.json({
        blogId:blog.id
      })

    
    
  })
  
  blogRouter.put('/',async (c)=>{
    const body=await c.req.json();

    const { success }=updateBlogSchema.safeParse(body);

    if(!success){
      c.status(403);
      return c.json({
        message:"incorrect inputs"
      })
    }
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

     

      const blog=await prisma.blog.update({
        where:{
            id:body.id
            
        },
        data:{
           title:body.title,
           content:body.content
        }
      })

      return c.json({
        blogId:blog.id
      })
    

  })
   
  //add pagination here
  blogRouter.get('/bulk',async (c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())


      const blogs=await prisma.blog.findMany({
        select:{
          title:true,
          content:true,
          id:true,
          author:{
            select:{
              name:true
            }
          }
        }
      })

      return c.json({
        blogs:blogs
      })

  })
  
  blogRouter.get('/:id',async (c)=>{
    const id=c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      
      try{
      const blogs=await prisma.blog.findFirst({
        where:{
            id:id
        },

        select:{
          id:true,
          title:true,
          content:true,
          author:{
            select:{
              name:true
            }
          }

        }
      })

      return c.json({
        blogs:blogs
      })

    }
    catch(e){
        c.status(411);
        c.json({
            message:"Error while fetching blog"
        })
    }

  })
