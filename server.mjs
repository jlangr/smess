import express from "express"
import cors from "cors"
import studentRoutes from "./src/students/studentRoutes.mjs"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/students", studentRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
