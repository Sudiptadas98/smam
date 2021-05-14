import { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";
import Search from "./pages/Search";


const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);

    const [showsearch, setShowsearch] = useState(false);
    const [userdata, setUserdata] = useState([]);
    const [show, setShow] = useState(false);
    const iRef = useRef();

    const calling = async () => {
        try {
            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            // console.log(data.name);
            if (data) {
                setUserdata(data);

            }

        } catch (err) {

            setUserdata(false);
        }
    }



    useEffect(() => {

        calling();

        const handler = (e) => {
            if (!iRef.current.contains(e.target)) {
                setShow(false);
            }
        };

        document.addEventListener("mousedown", handler);

    }, [show]);


    const clicked = () => {
        setShow(true);
    }

    const RenderMenu = () => {
        if (state === false) {
            setUserdata(false);
        }


        if (state || userdata) {
            return (
                <>
                    <ol>
                        <li style={{ display: showsearch ? "block" : "none" }}><Search /></li>
                        <li className="searchformbl" style={{ display: showsearch ? "block" : "none" }}><i onClick={() => { setShowsearch(false) }} className="fas fa-times"></i></li>
                        <li className="searchformbl" style={{ display: showsearch ? "none" : "block" }}><i onClick={() => { setShowsearch(true) }} className="fas fa-search"></i></li>
                        <li className="searchforpc"><Search /></li>
                        <li className="searchforpc crossicon"><i className="fas fa-search"></i></li>
                        <li><NavLink className="nav-link" to="/recommendations">Recommends</NavLink></li>
                        <div className="profile">
                            <div ref={iRef} onClick={() => { setShow(false); calling(); }} className="profiledropdown" style={{ display: show ? "block" : "none" }}>

                                <li className="profileopt"><NavLink className="drop-link" to="/about">{userdata.name}</NavLink></li>

                                <li className="profileopt"><NavLink className="drop-link" to="/logout">Log Out</NavLink></li>

                            </div>
                            <li><i onClick={clicked} className="fas fa-user profileicon"></i></li>
                        </div>
                    </ol>

                </>
            )
        } else {
            return (
                <>
                    <ol>
                        <li style={{ display: showsearch ? "block" : "none" }}><Search /></li>
                        <li style={{ display: showsearch ? "block" : "none" }}><i onClick={() => { setShowsearch(false) }} className="fas fa-times"></i></li>
                        <li style={{ display: showsearch ? "none" : "block" }}><i onClick={() => { setShowsearch(true) }} className="fas fa-search"></i></li>
                        <li><NavLink className="nav-link" to="/recommendations">Recommends</NavLink></li>
                        <li><NavLink className="nav-link" to="/login">LogIn</NavLink></li>
                        {/* <li><NavLink className="nav-link" to="/signup">Sign Up</NavLink></li> */}
                        <li style={{ display: "none" }}><i ref={iRef} onClick={clicked} className="fas fa-user"></i></li>
                    </ol>
                </>
            )
        }
    }

    const [nav, setNav] = useState(false);

    const changeNav = () => {
        if (window.scrollY >= 300) {
            setNav(true);
        } else {
            setNav(false);
        }
    }

    window.addEventListener("scroll", changeNav);

    return (
        <>
            <div className={nav ? "navbar activenav" : "navbar"}>
                <div className="leftnav">
                    <NavLink className="nav-link" to="/"><i className="fas fa-film logo"></i></NavLink>
                </div>
                <div className="rightnav">
                    <RenderMenu />
                </div>
            </div>
        </>
    )
}

export default Navbar;