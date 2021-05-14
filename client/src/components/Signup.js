import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import movisvg from "./assests/moviesvg.svg";
const Signup = () => {
    const history = useHistory();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }



    const callSignupPage = async () => {
        try {
            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            if (data) {
                history.push("/");
            }

        } catch (err) {
            console.log(err);

        }
    }
    useEffect(() => {
        callSignupPage();
    }, []);




    const postData = async (e) => {
        e.preventDefault();

        const { name, email, password, cpassword } = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password, cpassword
            })
        });

        const data = await res.json();


        if (res.status === 422 || !data) {
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        } else {
            window.alert("Registration Successfull");
            console.log("Registration Successfull");

            history.push("/login");
        }
    }


    return (
        <>
            {/* <div className="main">
                <div className="signupcard">
                    <h1>Sign Up</h1>
                    <form method="POST" className="signupform">
                        <div className="formdiv">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" autoComplete="off" placeholder="enter your name"
                                value={user.name}
                                onChange={handleInputs} />
                        </div>
                        <div className="formdiv">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" autoComplete="off" placeholder="enter your email"
                                value={user.email}
                                onChange={handleInputs} />
                        </div>
                        <div className="formdiv">
                            <label htmlFor="phone">Phone</label>
                            <input type="number" name="phone" autoComplete="off" placeholder="enter your phone number"
                                value={user.phone}
                                onChange={handleInputs} />
                        </div>
                        <div className="formdiv">
                            <label htmlFor="work">Work</label>
                            <input type="text" name="work" autoComplete="off" placeholder="enter your work details"
                                value={user.work}
                                onChange={handleInputs} />
                        </div>
                        <div className="formdiv">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" autoComplete="off" placeholder="enter your password"
                                value={user.password}
                                onChange={handleInputs} />
                        </div>
                        <div className="formdiv">
                            <label htmlFor="cpassword">Confrim Password</label>
                            <input type="password" name="cpassword" autoComplete="off" placeholder="confirm password"
                                value={user.cpassword}
                                onChange={handleInputs} />
                        </div>
                        <div className="signupbtn">
                            <button type="submit" className="regbtn" value="register" onClick={postData}>Submit</button>
                            <br />
                            <NavLink to="/login">Already Registerd?</NavLink>
                        </div>
                    </form>
                </div>
            </div> */}



            <div className="loginpage">
                <div className="logincard signupcardnew">
                    <div className="addsec signaddsec">
                        <img src={movisvg} />
                        <div className="addtextsec">
                            <div style={{ margin: "5vh 5vh 0 0" }}>
                                <h4>Already have an account?</h4>
                            </div>
                            <NavLink to="/login"><button className="loginsmbtn">Log In</button></NavLink>
                        </div>
                    </div>
                    <div className="loginsec">
                        <h1>Sign Up</h1>
                        <form method="POST" className="loginform">
                            <div className="inputfield">
                                <i className="fas fa-user-circle"></i>
                                <input type="text" name="name" autoComplete="off" placeholder="Enter your name"
                                    value={user.name}
                                    onChange={handleInputs} />
                            </div>
                            <div className="inputfield">
                                <i className="fas fa-envelope"></i>
                                <input type="email" name="email" autoComplete="off" placeholder="Enter your email"
                                    value={user.email}
                                    onChange={handleInputs} />
                            </div>
                            {/* <div className="inputfield">
                                <i className="fas fa-envelope"></i>
                                <input type="number" name="phone" autoComplete="off" placeholder="enter your phone number"
                                    value={user.phone}
                                    onChange={handleInputs} />
                            </div>
                            <div className="inputfield">
                                <i className="fas fa-envelope"></i>
                                <input type="text" name="work" autoComplete="off" placeholder="enter your work details"
                                    value={user.work}
                                    onChange={handleInputs} />
                            </div> */}
                            <div className="inputfield">
                                <i className="fas fa-lock"></i>
                                <input type="password" name="password" autoComplete="off" placeholder="Enter your password"
                                    value={user.password}
                                    onChange={handleInputs} />
                            </div>
                            <div className="inputfield">
                                <i class="fas fa-lock"></i>
                                <input type="password" name="cpassword" autoComplete="off" placeholder="Confirm password"
                                    value={user.cpassword}
                                    onChange={handleInputs} />
                            </div>
                            <div>
                                <button type="submit" className="loginsmbtn" value="register" onClick={postData}>Sign Up</button>
                                <br />

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;