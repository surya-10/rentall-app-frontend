import { useEffect } from "react";
import Base from "./base";
import { useState } from "react";

function Mybookings() {
    
    let [spin, setSpin] = useState(false);
    let [allUser, setAllUser] = useState([]);
    let [bikes, setBikes] = useState([]);
    let [count, setCount] = useState(false);
    let [bookedBike, setBookedBike] = useState([]);
    let userId = localStorage.getItem("userId");
    useEffect(() => {
        getImages();
        getAllUsers();
    }, []);

    async function getImages() {
        setSpin(true);
        let data = await fetch("https://rental-app-b051.onrender.com/all", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        let out = await data.json();
        let a = findbookedbike(out.data, userId);
        setSpin(false);
    }

    async function getAllUsers() {
        let users = await fetch("https://rental-app-b051.onrender.com/users", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        let usersData = await users.json();
    }
    async function findbookedbike(datas, userId){
        if(userId!== null){

        
        let arr = datas.filter((bike) => userId == bike.bookedUserId);
        console.log(userId);
        console.log("arr", arr);
        setBookedBike(arr);
        }
        // return arr;
    }



    return (
        <Base>
            <div className="booking-div">
                <div className="container-fluid d-flex justify-content-center align-items-center align-content-center">
                    <div>
                    {bookedBike.length == 0 ? <h5 className="text-dark text-uppercase fw-bold">No Bookings</h5>:<h5 className="text-dark text-uppercase fw-bold">Your bookings</h5>}
                        <div className="booked-bikes mt-4 d-flex justify-content-center align-items-center flex-row flex-wrap">
                            
                            {bookedBike.map((bike) => (
                                <div className="bike-data" key={bike._id}>
                                    <div>
                                        <img src={bike.link} />
                                        <h5>{bike.name}</h5>
                                    </div>
                                    
                                        <p><small>From :{bike.startDate.slice(0, 16)}</small></p>
                                        <p><small>To :{bike.endDate.slice(0, 16)}</small></p>
                                        
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
                
            </div>
            {spin &&
          <div className='spn2'>
            <div class="spinner-grow bg-warning" role="status m-1">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow bg-warning" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow bg-warning" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        }
        </Base>
    )
}
export default Mybookings;