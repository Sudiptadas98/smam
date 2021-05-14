import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { API_URL, API_KEY } from "../Config";
const Favourites = (props) => {


    const [movie, setMovie] = useState();
    useEffect(() => {

        const fetchApi = async () => {
            try {
                const url = `${API_URL}${props.type}/${props.id}?api_key=${API_KEY}`
                const res = await fetch(url);
                const data = await res.json();

                // console.log(data);
                setMovie(data);

            } catch (err) {
                console.log(err);
            }
        }
        fetchApi();
    }, [])


    //removefav
    const removefav = async (e) => {
        e.preventDefault();

        // const { name, email, phone, message } = userData;
        const mid = props.id;
        const mtype = props.type;
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
            {movie &&
                // <div style={{ display: "flex", margin: "10px 5px"}}>
                //     <img style={{ width: "40px", borderRadius:"5px" }} src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />
                //     <p style={{marginLeft: "10px"}}>{movie.title || movie.name}</p>
                // </div>
                <NavLink style={{ textDecoration: "none", color: "black" }} to={`/${props.type}/${props.id}`}>
                    {/* <div className="searchoption" style={{justifyContent: "space-between", alignItems: "center"}}> */}
                    <div className="favis">
                        <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />
                        <div className="favisdet">
                            <h3>{movie.title || movie.name}</h3>
                            <div className="favitemtype">
                                <span>{props.type}</span>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </NavLink>
            }
        </>
    )
}
export default Favourites;