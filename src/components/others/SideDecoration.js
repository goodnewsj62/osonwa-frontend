import cylinder from "static/images/cylinder_3d_shape.png";
import donut  from "static/images/donut_3d_shape.png";
import rect from "static/images/rect.png";
import sphere from "static/images/sphere_3d_shape.png";
import square from "static/images/square_3d_shape.png";

export default function Decoration(props){
    return( 
        <div className="decoration">
            <img src={cylinder} alt="cylinder shape" />
                <img src={rect} alt="rectangle shape" />
                <img src={donut} alt="donut shape" />
                <img src={sphere} alt="sphere shape" />
                <img src={square} alt="square shape" />
                <h2>
                    Broadway to the latest happenings in tech
                </h2>
        </div>
    );
};