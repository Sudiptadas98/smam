import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { API_URL, API_KEY } from "../Config";
import MovieBanner from "./MovieBanner";

const CreateRec = ({ match }) => {
    const movieid = match.params.movieid;
    const type = match.params.type;
    const [movie, setMovie] = useState([]);

    const [postdata, setPostdata] = useState("");

    const history = useHistory();
    useEffect(() => {

        const fetchApi = async () => {
            try {
                const url = `${API_URL}${type}/${movieid}?api_key=${API_KEY}`
                const res = await fetch(url);
                const data = await res.json();

                // console.log(data);
                setMovie(data);

            } catch (err) {
                console.log(err);
            }
        }


        const getUser = async () => {
            try {
                const res = await fetch("/getdata", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                const data = await res.json();


                if (!res.status === 200) {
                    const error = new Error(res.error);
                    throw error;
                }

            } catch (err) {
                history.push('/login');
                console.log(err);

            }
            // console.log(favs);


        }

        getUser();
        fetchApi();

    }, [movieid, type])





    const handleInputs = (e) => {
        const value = e.target.value;
        setPostdata(value);
    }

    const postRec = async (e) => {
        e.preventDefault();
        const mid = movieid;
        const mtype = type;
        const body = postdata;

        const res = await fetch("/postrec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mid, mtype, body
            })
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            window.alert("Invalid details");
            console.log("Invalid details");
        } else {
            window.alert("Posted Successfull");
            console.log("Posted Successfull");

            setPostdata("");

            history.push("/recommendations");
        }
        // console.log(postdata);
    }

    return (
        <>
            <div className="createrec">
                <div method="POST" className="createrecbox">
                    <div className="crbanner">
                        {movie &&
                            <MovieBanner image={movie.backdrop_path} title={movie.title || movie.name} tagline={movie.tagline} />
                        }
                    </div>
                    <div className="boxpost">
                        <div className="crpic">
                            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />
                        </div>
                        <div className="createrecdetsec">
                            <h1>{movie.title || movie.name}</h1>
                            <textarea cols="50" rows="8" placeholder="write something here.."
                                onChange={handleInputs}
                                value={postdata}></textarea>
                        </div>
                    </div>
                    <div className="boxbtn">
                        <button onClick={postRec} className="homesmbtn">Post Now</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateRec;