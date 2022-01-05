import { useContext } from "react"
import { UserContext } from "../App"

export const Dashboard = () => {
      const { user } = useContext(UserContext)
      const { email } = user

      return (
            <div>
                  The user email: {decodeURIComponent(email)}
            </div>
      )
}