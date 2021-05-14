import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { API_URL, API_KEY } from "../Config";
const Rec = (props) => {

    const [movie, setMovie] = useState([]);
    // const [yeslike, setYeslike] = useState(props.likes.includes(props.uid) ? true : false);

    // if (props.likes.includes(props.uid)) {
    //     setYeslike(false);
    // }
    const [likelnth, setLikelnth] = useState(props.likes.length);

    const history = useHistory();
    useEffect(() => {

        const fetchApi = async () => {
            try {
                const url = `${API_URL}${props.mtype}/${props.mid}?api_key=${API_KEY}`
                const res = await fetch(url);
                const data = await res.json();

                // console.log(data);
                setMovie(data);

            } catch (err) {
                console.log(err);
            }
        }



        fetchApi();

    }, []);


    //liked
    const liked = async (e) => {
        e.preventDefault();

        setYeslike(true);
        try {

            const postId = props.id;
            const res = await fetch("/like", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/Json"
                },
                body: JSON.stringify({
                    postId
                })
            });
            const data = await res.json();
            if (!data) {
                console.log("not liked");

            } else {
                setLikelnth(likelnth + 1);
                alert("liked");
                // setUserData({...userData, message:""});
            }

        } catch (err) {
            console.log(err);
            history.push("/login");
        }


    }

    //unliked
    const unliked = async (e) => {
        e.preventDefault();
        setYeslike(false);
        try {

            const postId = props.id;
            const res = await fetch("/unlike", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/Json"
                },
                body: JSON.stringify({
                    postId
                })
            });
            const data = await res.json();
            if (!data) {
                console.log("not unliked");

            } else {
                setLikelnth(likelnth - 1);
                alert("unliked");
                // setUserData({...userData, message:""});
            }

        } catch (err) {
            console.log(err);
            // history.push("/login");
        }
    }





    const [yeslike, setYeslike] = useState(props.likes.includes(props.uid) ? true : false);

    return (
        <>

            <div className="recbox">
                <div className="postuser">
                    <h3>@{props.postedBy.name || "You"}</h3>
                    <span>{props.date}</span>
                </div>
                <div style={{ display: "flex" }}>

                    <NavLink className="recpic" to={`/${props.mtype}/${props.mid}`}>
                        <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />
                    </NavLink>

                    <div className="postdetsec">
                        <h2>{movie.title || movie.name}</h2>

                        <p>{props.body}</p>
                        <div className="recicons">
                            <div>
                                <i style={{ display: yeslike ? "none" : "block" }} onClick={liked} className="fas fa-heart like"></i>
                                <i style={{ display: yeslike ? "block" : "none", color: "rgb(255, 87, 87)" }} onClick={unliked} className="fas fa-heart unlike"></i>
                                <span>{(likelnth == 0) ? null : likelnth}</span>
                            </div>
                            <NavLink style={{ textDecoration: "none", color: "black" }} to={`/about/rec/${props.id}`}><i className="fas fa-comment-alt"></i></NavLink>

                        </div>
                    </div>
                </div>
                <div className="postdetbodymbl">
                    <p>{props.body}</p>
                    <div className="reciconsmbl">
                        <div>
                            <i style={{ display: yeslike ? "none" : "block" }} onClick={liked} className="fas fa-heart like"></i>
                            <i style={{ display: yeslike ? "block" : "none", color: "rgb(255, 87, 87)" }} onClick={unliked} className="fas fa-heart unlike"></i>
                            <span style={{ margin: "0 0 0 12px" }}>{(likelnth == 0) ? null : likelnth}</span>
                        </div>
                        <NavLink style={{ textDecoration: "none", color: "black" }} to={`/about/rec/${props.id}`}><i className="fas fa-comment-alt"></i></NavLink>

                    </div>
                </div>
            </div>

        </>
    )
}
export default Rec;
// style={{ display: yeslike ? "block" : "none" }}
// style={{ display: yeslike ? "none" : "block" }}