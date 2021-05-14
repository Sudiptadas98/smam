import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Favourites from "./pages/Favourites";
import Rec from "./pages/Rec";
import Loading from "./pages/Loading";

const About = () => {

    const history = useHistory();

    const [userData, setUserData] = useState([]);
    const [favs, setFavs] = useState([]);
    const [myposts, setMyposts] = useState([]);

    const [favshow, setFavshow] = useState(true);
    const [postshow, setPostshow] = useState(false);
    const [load, setLoad] = useState(true);

    const callAboutPage = async () => {
        try {
            const res = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            // console.log(data.favourite);
            setUserData(data);
            
            setFavs(data.favourite);
            setLoad(false);


            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
            history.push('/login');
        }

    }

    const callMyRecsPage = async () => {
        try {
            const res = await fetch("/myposts", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            // console.log(data.myposts);

            setMyposts(data.myposts);


        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        callAboutPage();
        callMyRecsPage();
    }, []);

    return (
        <>{load ? <Loading /> :
            <div className="aboutpage">
                <div className="profilesec">
                    <div className="profilesecpart">
                        <h2>{userData.name}</h2>
                    </div>
                    <div className="profilesecpart">
                        <h2>{userData.email}</h2>
                    </div>
                </div>

                <div className="favandpostsec">
                    <div className={favshow ? "favsecpointon" : "favsecpointoff"} style={{ cursor: "pointer" }} onClick={() => { setFavshow(true); setPostshow(false); }}><h1>Favourites</h1></div>
                    <div className={postshow ? "postsecpointon" : "postsecpointoff"} style={{ cursor: "pointer" }} onClick={() => { setPostshow(true); setFavshow(false); }}><h1>MyPosts</h1></div>
                </div>
                <div className="favsecmat" style={{ display: favshow ? "block" : "none" }}>


                    {favs && favs.map((c) => (
                        <Favourites key={c.mid} id={c.mid} type={c.mtype} />
                    ))}


                </div>
                <div className="postsecmat" style={{ display: postshow ? "block" : "none" }}>

                    {myposts && myposts.map((c) => (
                        <Rec key={c._id}
                            id={c._id}
                            mid={c.mid}
                            mtype={c.mtype}
                            body={c.body}
                            postedBy={"You"}
                            date={c.date}
                            likes={c.likes}
                            uid={userData._id} />
                    ))}
                </div>
            </div>
        }
        </>
    )
}
export default About;