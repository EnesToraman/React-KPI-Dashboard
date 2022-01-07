import { useNavigate } from "react-router-dom"
import { api } from "../api/api"

export const Logout = () => {
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            console.log("here")
            await api.logout()
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
        <button onClick={handleClick} type="submit" className="btn submit-buttons">Log out</button>
        </div>
    );
}
 