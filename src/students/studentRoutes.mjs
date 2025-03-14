import express from "express"
import { getStudents } from "./studentService.mjs"

const router = express.Router()

router.get("/", async (req, res) => {
  const students = await getStudents()
  res.json(students)
})

export default router
