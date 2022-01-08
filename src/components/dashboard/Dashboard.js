import { Container } from "react-bootstrap";
import { Logout } from "../Logout";
import { Revenue } from "./Revenue";
import { AvgTicketPrice } from "./AvgTicketPrice";
import { TicketClass } from "./TicketClass";
import { EmployeeTitle } from "./EmployeeTitle";
import { Plane } from "./Plane";
import { Ticket } from "./Ticket"

export const Dashboard = () => {

    return (
        <div style={{ "backgroundColor": "rgba(209, 214, 216, 0.3)" }}>
            <Container>
                <Logout />
                <div className="row mt-4 justify-content-between">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12" style={{ "backgroundColor": "white", "borderRadius": "15px", "width": "49%" }}>
                        <Revenue />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12" style={{ "backgroundColor": "white", "borderRadius": "15px", "width": "49%" }}>
                        <AvgTicketPrice />
                    </div>
                </div>
                <div className="row mt-3 justify-content-between">
                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12" style={{ "backgroundColor": "white", "borderRadius": "10px", "width": "32.3%" }}>
                        <TicketClass />
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12" style={{ "backgroundColor": "white", "borderRadius": "10px", "width": "32.3%" }}>
                        <EmployeeTitle />
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12" style={{ "backgroundColor": "white", "borderRadius": "10px", "width": "32.3%" }}>
                        <Plane />
                    </div>
                </div>
                <Ticket />
            </Container>
        </div>
    );
}