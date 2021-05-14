import { NavLink } from "react-router-dom";
const Moviecard = ({ id, poster, title, media_type, date, vote_average }) => {



    return (
        <>
            <NavLink style={{ textDecoration: "none", color: "black" }} to={`/${media_type}/${id}`}>
                <div className="moviecardparent">
                    <div className="moviecard">
                        <img src={`https://image.tmdb.org/t/p/w200/${poster}`} />
                        <div className="moviedesp">
                            <div style={{ justifyContent: "space-between", display: "flex" }}>
                                <div className="moviecardmtype" style={{marginBottom: "2px"}}>{media_type === "tv" ? "TV Seriese" : "Movie"}</div>
                                {/* <div>{date}</div> */}
                            </div>
                            <div className="mvcardtitle">{title}</div>
                        </div>
                    </div>
                </div>
            </NavLink>
        </>
    )
}
export default Moviecard;