"use client"
 
import { z } from "zod"
 
const parentSchema = z.object({
  userName: z.string().min(2).max(50),
  role: z.string().min(2).max(50),
})


export default parentSchema