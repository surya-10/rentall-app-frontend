import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Base from './components/base';

const ImageUpload = () => {
  let [spin, setSpin] = useState(false);
  let navigate = useNavigate()
  let [images, setImages] = useState([])

  useEffect(() => {
    getImages()
  }, [])
  async function getImages() {
    setSpin(true);
    let data = await fetch("https://rental-app-b051.onrender.com/all", {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
    
    let out = await data.json();
    
    setImages(out.data);
    setSpin(false);

  }
  function book(id) {
    navigate(`/book/${id}`);
  }

  return (
    <div className='bikes-div'>
      <Base>
        <div className='container-fluid d-flex justify-content-center align-items-center align-content-center flex-column mt-5'>
          <h4 className='mt-4 mb-4 text-white tit'>Available bikes</h4>
          <div className='products d-flex flex-wrap flex-row justify-content-center min-vh-100 mb-5'>
            {images.map((prod) => (
              <div key={prod._id} className='product'>
                <div>
                  <img src={prod.link} />
                </div>

                <div>
                  <h5 className='name'>{prod.name}</h5>
                </div>
                <div className='book-btn'>
                  <button className='btn bg-warning text-black bk-btn' onClick={() => book(prod._id)}>Book now</button>
                </div>
              </div>

            ))}
          </div>
          {spin &&
          <div className='spn1'>
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
    </div>

  );
};

export default ImageUpload;
