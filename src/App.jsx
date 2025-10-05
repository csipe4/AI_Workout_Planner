import InputForm from './components/InputForm'
import WorkoutPlan from './components/WorkoutPlan'
import { useState } from "react"

export default function App() {

  const [workoutPlan, setWorkoutPlan] = useState("")

  return (
    <div>
      <h1>
        Welcome to your personal AI workout planner!
      </h1>
      {!workoutPlan ?
        <InputForm setWorkoutPlan={setWorkoutPlan}/>
        : <>
        <WorkoutPlan workoutPlan={workoutPlan}/>
        <button className="regenButton" onClick={() => setWorkoutPlan("")}>Generate another plan?</button>
        </>
      }
    </div>
  )
}