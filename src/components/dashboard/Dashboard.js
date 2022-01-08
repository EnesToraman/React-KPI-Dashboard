import { Container } from "react-bootstrap";
import { Logout } from "../Logout";
import { FirstRowGraph } from "./FirstRowGraph";
import { SecondRowGraph } from "./SecondRowGraph";
import { TicketDateData } from "./TicketDateData"

export const Dashboard = () => {

    return (
        <div style={{ "backgroundColor": "rgba(209, 214, 216, 0.3)" }}>
            <Container>
                <Logout />
                <FirstRowGraph />
                <SecondRowGraph />
                <TicketDateData />
            </Container>
        </div>
    );
}