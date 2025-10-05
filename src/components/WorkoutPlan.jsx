import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import "./WorkoutPlan.css"

export default function WorkoutPlan({ workoutPlan }) {
  if (!workoutPlan) return null

  return (
    <div className="workout-plan-container">
      <h2>Your Personalized Workout Plan 🏋️</h2>
      <div className="markdown-output">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {workoutPlan}
        </ReactMarkdown>
      </div>
      <p className="outro-text">
        💡 Remember: consistency beats perfection. Listen to your body and adjust as needed.
      </p>
    </div>
  )
}