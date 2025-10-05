import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Backend is running!")
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})

app.post("/api/form", async (req, res) => {
    try {
        const formData = req.body
        console.log("Recieved form data:", formData)
        const {age, weight, height, gender, goal, exp, days, minutes, equipment } = formData

        if (!age || !weight || !height || age < 10 || age > 100 || weight < 50 || weight > 700 || height < 48 || height > 100) {
            return res.status(400).json({ error: "Age, weight, and height must be provided and greater than 0." });
        }

        if (!Array.isArray(equipment)) {
            return res.status(400).json({ error: "Equipment must be an array." })
        }

        const prompt = `
        You are a fitness coach. Based on this information, generate a **weekly workout plan** formatted with clear sections and Markdown-style tables.
        Use this structure:
        1. Brief motivational introduction
        2. A table for each day (Day 1, Day 2, etc.)
        | Exercise | Sets | Reps | Notes |
        3. A short summary or recovery tips at the end.
        Details:
        Age: ${age}
        Weight: ${weight} lbs
        Height: ${height} inches
        Gender: ${gender || "Not specified"}
        Goal: ${goal || "Not specified"}
        Experience level: ${exp || "Not specified"}
        Workout days per week: ${days || "Not specified"}
        Time per session: ${minutes || "Not specified"}
        Equipment available: ${equipment.length ? equipment.join(", ") : "No equipment"}
        Give a step-by-step plan for a week including warmups, exercises, sets, reps, and cool downs.
        `
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 800,
        })

        const workoutPlan = completion.choices[0].message.content

        res.json({ message: "Workout plan generated successfully!", workoutPlan })
    } 
    catch (error) {
        console.error(error)
        res.status(500).json({ error: "Something went wrong generating the workout plan." })
    }
})