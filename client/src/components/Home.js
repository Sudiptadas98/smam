import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Trending from "./pages/Trending";
import Banner from "./assests/banner.jpg";


const Home = () => {

    const [userexist, setUserexist] = useState();
    const [home, setHome] = useState("home");
    const [loadmfh, setLoadmfh] = useState("");
    const [userData, setUserData] = useState("");
    const [show, setShow] = useState(false);

    const callHomePage = async () => {
        try {
            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();

            if (data) {
                setUserexist(true);
            } else {
                setUserexist(false);
            }

            setUserData(data.name);
            setShow(true);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);

        }
    }
    useEffect(() => {
        callHomePage();
    }, []);

    const backgroundStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0)19%,rgba(0,0,0,0)21%,rgba(0,0,0,0.65)55%), url("${Banner}")`
    }


    return (
        <>
            <div className=" homebanner" style={{ backgroundImage: `${backgroundStyle.backgroundImage}` }}>
                <div className="homebannertext">
                    <h1>Welcome.</h1>
                    <p>Movies, TV shows and Recommendations for you..</p>
                    <p>Explore now.</p>
                </div>

            </div>
            {/* {home && home.map((c) =>(<Trending true={c} />))} */}
            <div className="homeconsec">
                <Trending home={home} loadmfh={loadmfh} />
                <div style={{ display: "flex", justifyContent: "center", backgroundColor: "#d9d1f8" }}>
                    <NavLink onClick={() => { setLoadmfh("more") }} to="/trendingpage" className="homesmbtn">Show More</NavLink>
                </div>
            </div>
        </>
    )
}

export default Home;