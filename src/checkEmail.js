import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

let emailValidation = yup.object({
    email:yup.string().required("email")
})


function CheckEmail(){
    let [spin, setSpin] = useState(false);
    let [btn, setBtn] = useState(true);
    let navigate = useNavigate();
    let {values, handleChange, handleSubmit, handleBlur, touched, errors} = useFormik({
        initialValues:{
            email:""
        },
        validationSchema:emailValidation,
        onSubmit:(obj)=>{
            // console.log(obj);
            checkUserEmail(obj)
        }
    })

    async function checkUserEmail(obj){
        setBtn(false);
        setSpin(true);
        let result = await fetch("https://rental-app-b051.onrender.com/forgot", {
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "content-type":"application/json"
            }
        })
        let output = await result.json();
        setSpin(false);
        if(output.status===200 && output.msg=="exist"){
            navigate(`/new-password/${output.myID}`);
        }
        else{
            setBtn(true);
            alert("Your email does not exist. Do signup")
        }
    }
    return (
        <div className="email-check-div">
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="email-div bg-white p-3 rounded pb-5">
                    <form onSubmit={handleSubmit}>
                    <p className="h5 m-3">Enter your registered email</p>
                    <div className="input-group mb-3 mt-2">
                            <input type="email" className="form-control form-control-lg bg-light fs-6 inp" placeholder="Enter email" 
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            />
                        </div>
                        {errors.email && touched.email ? <small className="mb-5 text-danger">Email cannot be empty</small>: ""}
                        {btn && <div className="email-check mt-4">
                            <button className="btn bg-danger text-white" type="submit">Check</button>
                        </div>}
                        </form>
                </div>
            </div>
            {spin &&
          <div className='spn3'>
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
    )
}
export default CheckEmail;