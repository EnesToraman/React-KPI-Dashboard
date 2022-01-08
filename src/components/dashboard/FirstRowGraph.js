import { Graph1 } from "./graph1";
import { Graph2 } from "./graph2";

export const FirstRowGraph = () => {

    return (
        <div className="row mt-4 justify-content-between">
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12" style={{ "backgroundColor": "white", "borderRadius": "15px", "width": "49%" }}>
                <Graph1 />
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12" style={{ "backgroundColor": "white", "borderRadius": "15px", "width": "49%" }}>
                <Graph2 />
            </div>
        </div>
    );
}