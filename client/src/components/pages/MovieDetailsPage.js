import { useEffect, useState } from "react";
import { API_URL, API_KEY } from "../Config";
import MovieBanner from "./MovieBanner";
import Genres from "./Genres";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";

const MovieDetailsPage = ({ match }) => {
    const history = useHistory();
    const [movie, setMovie] = useState([]);
    const [genres, setGernes] = useState([]);
    const movieid = match.params.movieid;
    const type = match.params.type;
    const [yesfav, setYesfav] = useState(false);
    // console.log(type);
    useEffect(() => {


        const fetchApi = async () => {
            try {
                const url = `${API_URL}${type}/${movieid}?api_key=${API_KEY}`
                const res = await fetch(url);
                const data = await res.json();

                // console.log(data);
                setMovie(data);
                setGernes(data.genres);
            } catch (err) {
                console.log(err);
            }
        }



        //findfav
        const findFav = async () => {
            try {
                const mid = movieid;
                const mtype = type;
                const res = await fetch("/havefav", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        mid, mtype
                    })
                });

                const data = await res.json();
                if (data) {
                    setYesfav(true);
                }

                if (!res.status === 200) {
                    const error = new Error(res.error);
                    throw error;
                }

            } catch (err) {
                console.log(err);

            }

        }


        fetchApi();
        findFav();
    }, [movieid, type])


    // console.log(genres);






    //addfav
    const addfav = async (e) => {
        e.preventDefault();
        try {
            setYesfav(true);
            // const { name, email, phone, message } = userData;
            const mid = movieid;
            const mtype = type;
            const res = await fetch("/favourite", {
                method: "POST",
                headers: {
                    "Content-Type": "application/Json"
                },
                body: JSON.stringify({
                    mid, mtype
                })
            });
            const data = await res.json();
            if (!data) {
                console.log("fav not added");

            } else {
                alert("Added to fav");
                // setUserData({...userData, message:""});
            }

        } catch (err) {
            console.log(err);
            history.push("/login");
        }
    }

    //removefav
    const removefav = async (e) => {
        e.preventDefault();
        setYesfav(false);
        // const { name, email, phone, message } = userData;
        const mid = movieid;
        const mtype = type;
        const res = await fetch("/removefav", {
            method: "POST",
            headers: {
                "Content-Type": "application/Json"
            },
            body: JSON.stringify({
                mid, mtype
            })
        });
        const data = await res.json();
        if (data) {
            // console.log("fav not removed");
            alert("removed from favs");
        }

    }



    return (
        <>

            <div className="moviedetpage">
                {movie &&
                    <MovieBanner image={movie.backdrop_path} title={movie.title || movie.name} tagline={movie.tagline} />
                }
                <div className="movieabtsec">
                    <div className="movieposter">
                        <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />
                    </div>
                    <div className="abtmovie">
                        <div className="title">
                            <h1>{movie.title || movie.name}</h1>
                            <p>{type === "tv" ? "TV Seriese" : "Movie"}</p>
                            <p>{movie.release_date || movie.first_air_date}</p>
                        </div>
                        <div className="genres">
                            {genres && genres.map((c) => (
                                <Genres key={c.id} name={c.name} />
                            ))
                            }
                        </div>
                        <div className="overview">
                            <h1>Overview</h1>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                    <div method="POST">
                        <button className="addfavbtn" type="submit" style={{ display: yesfav ? "none" : "block" }} onClick={addfav}><i className="fas fa-star"></i></button>
                        <button className="rmvfavbtn" type="submit" style={{ display: yesfav ? "block" : "none" }} onClick={removefav}><i className="fas fa-star"></i></button>
                    </div>
                </div>
                <div className="ovmbl">
                    <h1>Overview</h1>
                    <p>{movie.overview}</p>
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <NavLink to={`/${type}/createrec/${movieid}`}>
                        <button className="homesmbtn">Recommend this movie</button>
                    </NavLink>
                </div>
            </div>
        </>
    )
}
export default MovieDetailsPage;