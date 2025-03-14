import request from "supertest"
import express from "express"
import studentRoutes from "../../src/students/studentRoutes.mjs"

const app = express()
app.use(express.json())
app.use("/students", studentRoutes)

describe("GET /students", () => {
  it("returns a JSON list of students", async () => {
    const res = await request(app).get("/students")
    expect(res.status).toBe(200)
    expect(res.headers["content-type"]).toMatch(/json/)
    expect(res.body).toHaveLength(5)
    expect(res.body[0]).toHaveProperty("id")
    expect(res.body[0]).toHaveProperty("name")
  })
})
