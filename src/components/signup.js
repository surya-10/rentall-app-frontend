import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export const userValidation = yup.object({
    username: yup.string().required("Enter username"),
    password: yup.string().required("Enter password"),
    email: yup.string().required("Enter your email")
})
function Signup() {
    
    let [spin, setSpin] = useState(false);
    let navigate = useNavigate();
    let [show, setShow] = useState(false);

    let { values, handleChange, handleSubmit, handleBlur, touched, errors } = useFormik({
        initialValues: {
            username: "",
            password: "",
            email: ""
        },
        validationSchema: userValidation,
        onSubmit: (obj) => {
            signUpUser(obj);

            // navigate("/login");
            // alert("your signin was successfull, fill below details to login")
        }
    })
    async function signUpUser(obj) {
        setSpin(true);
        let reult = await fetch("https://rental-app-b051.onrender.com/signup", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "content-type": "application/json"
            }
        })
        let out = await reult.json();
        setSpin(false)
        if (out.status === 201 && out.resp === true) {
            navigate("/available-bikes")
        }
        if (out.status = 400 && out.resp === false) {
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 3000);
            navigate("/login")

        }

    }
    return (
        <div className="signup-div">
            <div className="cont">
                <div className="sign p-3 d-flex justify-content-end">
                    <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-50 mt-4">
                        <div className="row border rounded-4 p-3 bg-white shadow box-area bxx">
                            <div className="col-md-6 left-box d-flex justify-content-center align-items-center flex-column border rounded-4 p-3" style={{ "background": "linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%)" }}>
                                <div className="img">
                                    {/* <img src="https://previews.123rf.com/images/narutotootee/narutotootee1301/narutotootee130100129/17168740-blue-square-abstract-background.jpg" alt="image" className="img-fluid border rounded-2" style={{"width":250+"px"}}/> */}
                                    <p className="text-white title h2">Welcome</p>
                                    <small className="text-white text-center sub-title">Join with us</small>
                                </div>
                            </div>
                            <div className="col-md-6 right-box">
                                <div className="row-md-6 align-items-center d-flex flex-column jutify-content-between">
                                    <div className="header-text mb-4">
                                        {/* <p className="h4">Hello, Welcome</p> */}
                                        <p className="h6">Register Here</p>
                                    </div>
                                    <div className="input-group mt-4">
                                        <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Enter name"
                                            name="username"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {touched.username && errors.username ? <small className="" style={{ color: "crimson" }}>name cannot be empty</small> : ""}
                                    <div className="input-group mt-4">
                                        <input type="email" className="form-control form-control-lg bg-light fs-6" placeholder="Enter email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {touched.email && errors.email ? <small style={{ color: "crimson" }}>email cannot be empty</small> : ""}
                                    <div className="input-group mt-4">
                                        <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Enter password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {touched.password && errors.password ? <small style={{ color: "crimson" }}>password cannot be empty</small> : ""}

                                </div>
                                <div className="input-group mt-4">
                                    <button className="btn-sign fs-6" type="submit">Signup</button>
                                </div>
                                {show && <p className="fw-b text-uppercase text-danger">Already exist</p>}
                                {/* <p className="cursor-pointer point" onClick={()=>navigate("/login")}>Already have an account ?</p> */}
                                {/* <p className="signup-show">Your email already exist click on <a onClick={()=>navigate("/login")}><button className="btn bg-success text-white">Login</button></a></p> */}

                            </div>
                        </div>
                    </div>
                </form>
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
export default Signup;