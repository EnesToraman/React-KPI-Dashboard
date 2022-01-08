import { useNavigate } from "react-router-dom"
import { api } from "../api"

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
        <div className="row pt-4">
            <div className="col" style={{ "textAlign": "right" }}>
                <button onClick={handleClick} type="submit" className="btn submit-buttons">Log out</button>
            </div>
        </div>
    );
}
