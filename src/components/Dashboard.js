import { useAuth } from "../contexts/AuthContext"
import { useContext } from "react"

export const Dashboard = () => {
      const { email } = useAuth()

      return (
            <div>
                  {email}
            </div>
      )
}