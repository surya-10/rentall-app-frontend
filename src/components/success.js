import { useLocation, useNavigate } from "react-router-dom";
import success from "../success.jpg"
import { useEffect, useState } from "react";
function Success(){
    const [userId, setUserId] = useState(null);
    const location = useLocation();
    let navigate = useNavigate()
    useEffect(() => {
        // Extract userId from the URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const extractedUserId = urlParams.get('userId');
    
        // Update the state with the extracted userId
        setUserId(extractedUserId);
    }, []);
    return (
        <div className="success-div">
            <div className="d-flex justify-content-center align-items-center align-content-center min-vh-100 flex-column">
                
                <img src={success} className="success mb-4"/>
                <button onClick={()=>navigate(`/bookings/${userId}`)} className="btn bg-warning ">Home</button>
            
            </div>
        </div>
    )
}
export default Success;