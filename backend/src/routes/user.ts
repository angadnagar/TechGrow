import { signUpSchema,signInSchema } from '@angad_nagar/blogs-common';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from "hono";
import { sign} from "hono/jwt";

export const userRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
}>();

userRouter.post('/signup',async (c)=>{

  const body=await c.req.json();

    const { success }=signUpSchema.safeParse(body);

      if(!success){
        c.status(403);
        return c.json({
            message:"inputs are not correct"
        })
      }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    
     
    try{
    const user=await prisma.user.create({
      data:{
        name:body.name,
        email:body.email,
        password:body.password
      }
    })
  
    const token=await sign({id:user.id},c.env.JWT_SECRET)
  
    return c.json({
     token
    })
  }
  catch(err){
    c.status(403);
    return c.json({
      error:"Error while signing up"
    })
  }
  })

userRouter.post('/signin',async (c)=>{

     const body=await c.req.json();

     const { success }=signInSchema.safeParse(body);

      if(!success){
        c.status(403);
        return c.json({
            message:"inputs are not correct"
        })
      }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
  
    const user=await prisma.user.findUnique({
      where:{
        email:body.email,
        password:body.password
      }
    })
  
    if(!user){
      c.status(403);
      return c.json({
        error:"User does not exist"
      })
    }
  
    const token=await sign({id:user.id},c.env.JWT_SECRET);
  
    return c.json({
      token
    })
  })
  