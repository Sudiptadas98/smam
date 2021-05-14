import { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import movisvg from "./assests/moviesvg.svg";

const Login = () => {

    const { state, dispatch } = useContext(UserContext);

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const callLoginPage = async () => {
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
        callLoginPage();
    }, []);



    const loginUser = async (e) => {
        e.preventDefault();
        const res = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();

        if (res.status === 400 || !data) {
            window.alert("Invalid details");
        } else {

            dispatch({ type: "USER", payload: true });
            window.alert("Login Successful");

            history.push("/");
        }
    }

    return (
        <>
            {/* <div className="main">
                <div className="main">
                    <div className="signupcard">
                        <h1>Log In</h1>
                        <form method="POST" className="signupform">
                            <div className="formdiv">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" autoComplete="off" placeholder="enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="formdiv">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" autoComplete="off" placeholder="enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="signupbtn">
                                <button type="submit" className="regbtn" value="register" onClick={loginUser}>Log In</button>
                                <br />
                                <NavLink to="/signup">Create an account</NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div> */}
            <div className="loginpage">
                <div className="logincard">
                    <div className="addsec">
                        <img src={movisvg} />
                        <div className="addtextsec">
                            <div style={{margin: "0 5vh 0 0"}}>
                                <h4>Don't have an account?</h4>
                                <h3>Create One Now.</h3>
                            </div>
                            <NavLink to="/signup"><button className="loginsmbtn">Sign Up</button></NavLink>
                        </div>
                    </div>
                    <div className="loginsec">
                        <h1>Log In</h1>
                        <form method="POST" className="loginform">
                            <div className="inputfield">
                                <i className="fas fa-envelope"></i>
                                <input type="email" name="email" autoComplete="off" placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="inputfield">
                                <i class="fas fa-lock"></i>
                                <input type="password" name="password" autoComplete="off" placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <button type="submit" className="loginsmbtn" value="register" onClick={loginUser}>Log In</button>
                                <br />

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;