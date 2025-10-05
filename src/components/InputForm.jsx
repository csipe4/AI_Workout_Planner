import "./inputForm.css"
import { useState } from "react"
import axios from "axios"

export default function InputForm({setWorkoutPlan}) {

    const [age, setAge] = useState("")
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    const [gender, setGender] = useState("")
    const [goal, setGoal] = useState("")
    const [exp, setExp] = useState("")
    const [days, setDays] = useState("")
    const [minutes, setMinutes] = useState("")
    const [equipment, setEquipment] = useState([])
    const [loading, setLoading] = useState(false)

    const handleEquipmentChange = (e) => {
        const value = e.target.value
        if (e.target.checked) {
            setEquipment([...equipment, value])
        } else {
            setEquipment(equipment.filter((item) => item !== value))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        const formData = {
            age,
            weight,
            height,
            gender,
            goal,
            exp,
            days,
            minutes,
            equipment
        }
        
        try {
            const response = await axios.post("http://localhost:5000/api/form", formData)
            console.log("Server response:", response.data)
            setWorkoutPlan(response.data.workoutPlan)
        }
        catch(error) {
            console.error("Error sending data", error)
        }
        finally {
            setLoading(false)
        }

        setAge("")
        setWeight("")
        setHeight("")
        setGender("")
        setGoal("")
        setExp("")
        setDays("")
        setMinutes("")
        setEquipment([])
    }

    return (
        <div className="pageContainer">
            <form id="personalizationForm" onSubmit={handleSubmit} className="inputForm">
                <div className="formField">
                    <label>
                        Age:
                        <input type="number" value={age} min={10} max={100} step={1} placeholder="ex. 28" required onChange={(e) => setAge(e.target.value)}/>
                    </label>
                </div>
                <div className="formField">
                    <label>
                        Weight(pounds):
                        <input type="number" value={weight} min={50} max={700} step={1} placeholder="ex. 145" required onChange={(e) => setWeight(e.target.value)}/>
                    </label>
                </div>
                <div className="formField">
                    <label>
                        Height(inches):
                        <input type="number" value={height} placeholder="ex. 71" min={48} max={100} step={1} required onChange={(e) => setHeight(e.target.value)}/>
                    </label>
                </div>
                <div className="formField">
                    <label>
                        Gender:
                        <select value={gender} required onChange={(e) => setGender(e.target.value)}>
                            <option value="" disabled>Select one</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </label>
                </div>
                <div className="formField">
                    <label>
                        What is your workout goal?
                        <select value={goal} required onChange={(e) => setGoal(e.target.value)}>
                            <option value="" disabled>Select one</option>
                            <option value="Lose fat">Lose fat</option>
                            <option value="Build muscle">Build muscle</option>
                            <option value="Increase endurance">Increase endurance</option>
                            <option value="General fitness">General fitness</option>
                        </select>
                    </label>
                </div>
                <div className="formField">
                    <label>
                        How experienced are you with working out?
                        <select value={exp} required onChange={(e) => setExp(e.target.value)}>
                            <option value="" disabled>Select one</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </label>
                </div>
                <div className="formField">
                    <label>
                        How many days are you able to workout?
                        <select value={days} required onChange={(e) => setDays(e.target.value)}>
                            <option value="" disabled>Select one</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                    </label>
                </div>
                <div className="formField">
                    <label>
                        How long do you have to workout each session?
                        <select value={minutes} required onChange={(e) => setMinutes(e.target.value)}>
                            <option value="" disabled>Select one</option>
                            <option value="15 minutes or less">15 minutes or less</option>
                            <option value="15-30 minutes">15-30 minutes</option>
                            <option value="30-45 minutes">30-45 minutes</option>
                            <option value="45 minutes to an hour">45 minutes to an hour</option>
                            <option value="Over an hour">Over an hour</option>
                        </select>
                    </label>
                </div>
                <div className="formField">
                    <fieldset className="equipmentFieldset">
                        <legend>What equipment do you have access to?</legend>
                            <label>
                                <input type="checkbox"  value="Body weight" checked={equipment.includes("Body weight")} onChange={handleEquipmentChange}/>Body weight
                            </label>
                            <label>
                                <input type="checkbox" value="Kettlebells" checked={equipment.includes("Kettlebells")} onChange={handleEquipmentChange}/>Kettlebells
                            </label>
                            <label>
                                <input type="checkbox" value="Barbells" checked={equipment.includes("Barbells")} onChange={handleEquipmentChange}/>Barbells
                            </label>
                            <label>
                                <input type="checkbox" value="Resistance bands" checked={equipment.includes("Resistance bands")} onChange={handleEquipmentChange}/>Resistance bands
                            </label>
                            <label>
                                <input type="checkbox" value="Gym machines" checked={equipment.includes("Gym machines")} onChange={handleEquipmentChange}/>Gym machines
                            </label>
                    </fieldset>
                </div>
            </form>
            <button type="submit" form="personalizationForm" className="formField" disabled={loading}>{loading ? "Generating your plan..." : "Submit"}</button>
            {loading && <span className="spinner"></span>}
        </div>
    )
}