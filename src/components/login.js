import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

let loginValidation = yup.object({
    email: yup.string().required("Enter email"),
    password: yup.string().required("Enter password")
});


function Login() {
    let [spin, setSpin] = useState(false);
    let navigate = useNavigate();
    let [show, setShow] = useState(false);

    let { values, handleChange, handleSubmit, handleBlur, touched, errors } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginValidation,
        onSubmit: (obj) => {
            // console.log(obj)
            loginCheck(obj);
        }
    })

    async function loginCheck(obj) {
        setSpin(true);
        let result = await fetch("https://rental-app-b051.onrender.com/login", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "content-type": "application/json"
            }
        })
        let isExistUser = await result.json();
        setSpin(false)
        if(isExistUser.status==200){
            localStorage.setItem("userId", isExistUser.userId);
            localStorage.setItem("myUser", isExistUser.name);
            navigate(`/available-bikes`);
            
            
        }
        if(isExistUser.status==400 && isExistUser.msg=="not found"){
            alert("Your account does not exist. Do signup")
        }
        if(isExistUser.status==400 && isExistUser.msg=="incorrect"){
            setShow(true);
            setTimeout(()=>{
                setShow(false);
            }, 3000)
        }
    }
    return (
        <div className="login-page-div">
            <div>
                <div className="sign p-3 d-flex justify-content-end">
                    <button className="signup-btn" onClick={() => navigate("/")}>Signup</button>
                </div>

                <div className=" d-flex justify-content-center align-items-center min-vh-50 mt-5">

                    <div className=" p-2 rounded-4 login-width bg-white login-cont ">
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mt-4">
                                <div className="col d-flex justify-content-space-between align-items-center flex-column">

                                    <div className="header-text mt-4 mb-3">
                                        <h4 className="txt">Hello, again!</h4>
                                        <p className="tex">Fill below details to login</p>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="email" className="form-control form-control-lg bg-light fs-6 inp" placeholder="Enter email"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email} />
                                    </div>
                                    {touched.email && errors.email ? <small style={{ color: "salmon" }}>email cannot be empty</small> : ""}
                                    <div className="input-group mb-3 mt-2">
                                        <input type="password" className="form-control form-control-lg bg-light fs-6 inp" placeholder="Enter password"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password} />
                                    </div>
                                    {touched.password && errors.password ? <small style={{ color: "salmon" }}>password cannot be empty</small> : ""}
                                </div>
                            </div>
                            <div className="input-group mb-2 d-flex justify-content-end mt-3">
                                <button className=" login-btn" type="submit">Login</button>
                            </div>
                            {
                                show && 
                            <p className="forgot text-danger">Your email or password is incorrect</p>}
                            <p className="frt" onClick={()=>navigate("/forgot-password")}>Forgot password ?</p>

                        </form>


                    </div>

                </div>
            </div>
            {spin && <div className="spn">
            <button class="btn btn-primary" type="button" disabled>
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span class="visually-hidden" role="status">Loading...</span>
            </button>
            </div>}
        </div>
    )
}
export default Login;