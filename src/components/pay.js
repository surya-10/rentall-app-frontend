import { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useParams } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';




function AmountPay() {
  let userId = localStorage.getItem("userId");
  let { price } = useParams();
  let { id } = useParams();
  let { startDate } = useParams();
  let { endDate } = useParams();
  let { days } = useParams();

  let totalAmount = +price;

  const [paymentError, setPaymentError] = useState(null);

  useEffect(() => {
    getImages()
  }, [])
  let [bike, setBike] = useState([]);
  async function getImages() {
    let data = await fetch("https://rental-app-b051.onrender.com/all", {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
    let out = await data.json();
    setBike(out.data);

  }

  async function updateUSerDetails() {
    let dates = {
      startDate: startDate,
      endDate: endDate,
      days: days,
      price: totalAmount,
      bookedUserId:userId
    }
    let bookroom = await fetch(`https://rental-app-b051.onrender.com/booking/${id}`, {
      method: "POST",
      body: JSON.stringify(dates),
      headers: {
        "content-type": "application/json"
      }
    })
    let out = await bookroom.json()
    return true;
  }

  let findBike = bike.filter((prod) => prod._id == id);


  const makePayment = async () => {
    alert("Please wait until redirected to payment page");
    try {
      let stripe = await loadStripe("pk_test_51OI6CNSJofmDlhfyWujGWnHu1oLNpQ1VmwOd96hCIZdWgJtK1fSUDrQ099bD3rW5SMebmzwxn0e3nQHZLtnWK4v400Dp9N2Wap");
      findBike[0].priceDetail = totalAmount;
      findBike[0].quantity = 1;


      const paymentPage = await fetch(`http://localhost:9001/booking/payment-page/user-pay/${id}/${userId}`, {
        method: "POST",
        body: JSON.stringify(findBike),
        headers: {
          "content-type": "application/json",
        },
      });

      const result = await paymentPage.json();
      let update = await updateUSerDetails();
      const { error } = await stripe.redirectToCheckout({
        sessionId: result.id,
      });

      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    } catch (error) {
      console.error('Error loading Stripe:', error);
    }
  };

  return (
    <div>
      <div className='pay-divv d-flex justify-content-center align-items-center min-vh-100'>
        <div className='bg-white p-5 rounded border d-flex flex-column justify-content-space-evenly'>
          <div>
            <p>From: <b>{startDate.slice(0, 15)}</b></p>
            <p>To: <b>{endDate.slice(0, 15)}</b></p>
          </div>
          <p>Total Amount: Rs: {totalAmount}</p>

          {paymentError && <div style={{ color: 'red' }}></div>}

          <button className='btn bg-success  text-light' onClick={makePayment}>Pay Now</button>
        </div>
      </div>
    </div>
  )
}
export default AmountPay;