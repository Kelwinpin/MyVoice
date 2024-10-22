"use client"

import { z } from "zod"

const activityTypeSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres",
  }).max(30, {
    message: "Nome deve ter no máximo 30 caracteres",
  }),
})

export default activityTypeSchema