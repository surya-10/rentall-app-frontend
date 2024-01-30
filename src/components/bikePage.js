import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Base from "./base";


function BookBike() {
  let [spin, setSpin] = useState(true);
  let { id } = useParams();
  let navigate = useNavigate();
  let [bike, setBike] = useState([]);
  let [startDate, setStartDate] = useState(new Date());
  let [endDate, setEndDate] = useState(new Date())
  useEffect(() => {
    getImages()
    activatePayment();
  }, [id])
  async function activatePayment(){
    let activate = await fetch("https://rental-payment.onrender.com", {
      method:"GET",
      headers:{
        "content-type":"application/jspn"
      }
    })
    let out = await activate.json();
    console.log(out.msg);
  }
  async function getImages() {
    let data = await fetch("https://rental-app-b051.onrender.com/all", {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
    let out = await data.json();
    setSpin(false);
    setBike(out.data);

  }
  let findBike = bike.filter((prod) => prod._id == id);

  const handleStartDateChange = (date) => {
    const today = new Date();
    if (date >= today) {
      setStartDate(date);
    } else {
      alert('Please select today or a future date.');
    }
  };
  const handleEndDateChange = (date) => {
    if (date >= startDate) {
      setEndDate(date);
    } else {
      alert('End date must be equal to or after the start date.');
    }
  };
  async function calculateDay(startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    if (start == end) {
      return 1;

    } else {
      const differenceMilliseconds = Math.abs(end - start);
      let days = Math.ceil(differenceMilliseconds / (24 * 60 * 60 * 1000));
      return days + 1;
    }
  }
  async function handleSubmit(e) {
    setSpin(true);
    e.preventDefault();
    let totalDays = await calculateDay(startDate, endDate);
    let totalAmount = findBike[0].rate * totalDays;
    if (startDate <= endDate) {
      let dates = {
        startDate: startDate,
        endDate: endDate,
        days: totalDays,
        price: totalAmount
      }
      setSpin(false);
      navigate(`/payment/confirm/${id}/${totalAmount}/${startDate}/${endDate}/${dates.days}`);
    }



  }
  return (
    <Base>
      <div className="book-div">

        <div className="container-fluid d-flex flex-wrap flex-row justify-content-center flex-column min-vh-50 align-items-center">
          <h5 className="m-3 text-uppercase fw-bold">Selected Bike </h5>
          <div className="bike">
            {findBike.map((prod) => (
              <div key={prod._id} className='product-bike flex-lg-row flex-column justify-content-center align-items-center'>
                <div>
                  <div>
                    <img src={prod.link} />
                  </div>

                  <div className="mt-3 text-decoration-underline">
                    <h5 className='name'>{prod.name}</h5>
                  </div>
                </div>
                <div className="details">
                  <table className="tab">
                    <tr>
                      <th>Weight: </th>
                      <td>{prod.weight}</td>
                    </tr>
                    <tr>
                      <th>Fuel type: </th>
                      <td>{prod.fuelType}</td>
                    </tr>
                    <tr>
                      <th>Mileage: </th>
                      <td>{prod.mileage}</td>
                    </tr>
                    <tr>
                      <th>{prod.price}:</th>
                      <td><span className="me-2">{prod.rate}</span>{prod.priceType}</td>
                    </tr>
                    <tr>
                      <th>Condition: </th>
                      <td>{prod.condition}</td>
                    </tr>
                    <tr className="mt-2 mb-2">
                      <th className="note">Status:</th>
                      {prod.bookedStatus ? <td className="note fw-bold note1">booked</td> : <td className="note fw-bold note1">Not booked</td>}
                    </tr>
                    <tr>

                      <th className="note">Availability:</th>
                      {prod.bookedStatus ? <td className="note fw-bold note1">This bike wont be available until <span>{prod.endDate.slice(0, 16)}</span></td> : <td className="note fw-bold note1">Available</td>}
                    </tr>
                  </table>
                </div>
                <div className='book-btn'>
                  {prod.bookedStatus ? <button className="btn bg-warning text-black bk-btn" disabled>Book now</button> :
                    <form onSubmit={handleSubmit}>
                      <div>
                        <div className="d-flex flex-column justify-content-center align-items-start mb-2">
                          <label>Start</label>
                          <DatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            minDate={new Date()}
                            required
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-start mb-4">

                          <label>End</label>
                          <DatePicker
                            selected={endDate}
                            onChange={handleEndDateChange}
                            minDate={startDate}
                            required
                          />
                        </div>
                        <button className="btn bg-warning text-black bk-btn">Book now</button></div>
                    </form>}
                </div>
              </div>

            ))}
          </div>

        </div>
        {spin &&
          <div className='spn5'>
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

      </div>
    </Base>
  )
}
export default BookBike;