import { getStudents } from "../../src/students/studentService.mjs"

describe("getStudents", () => {
  it("returns a list of 5 students", async () => {
    const students = await getStudents()
    expect(students).toHaveLength(5)
    expect(students[0]).toHaveProperty("id")
    expect(students[0]).toHaveProperty("name")
  })
})
