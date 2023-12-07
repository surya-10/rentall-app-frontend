import { useNavigate } from "react-router-dom";
import success from "../success.jpg"
function Success(){
    let navigate = useNavigate()
    return (
        <div className="success-div">
            <div className="d-flex justify-content-center align-items-center align-content-center min-vh-100 flex-column">
                
                <img src={success} className="success mb-4"/>
                <button onClick={()=>navigate("/bookings")} className="btn bg-warning ">Home</button>
            
            </div>
        </div>
    )
}
export default Success;