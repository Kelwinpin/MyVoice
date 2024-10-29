"use client"
 
import { z } from "zod"
 
const kidSchema = z.object({
  gender: z.string().min(2).max(50),
  parentId: z.number().or(z.string()),
})


export default kidSchema