import { Graph3 } from "./graph3";
import { Graph4 } from "./graph4";
import { Graph5 } from "./graph5";

export const SecondRowGraph = () => {
    return (
        <div className="row mt-3 justify-content-between">
            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12" style={{ "backgroundColor": "white", "borderRadius": "10px", "width": "32.3%" }}>
                <Graph3 />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12" style={{ "backgroundColor": "white", "borderRadius": "10px", "width": "32.3%" }}>
                <Graph4 />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12" style={{ "backgroundColor": "white", "borderRadius": "10px", "width": "32.3%" }}>
                <Graph5 />
            </div>
        </div>
    );
}