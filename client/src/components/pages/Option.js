
import { NavLink } from "react-router-dom";

const Option = (props) => {


    return (
        <>
            <NavLink style={{ textDecoration: "none", color: "black" }} to={`/${props.type}/${props.id}`}>
                <div className="searchoption">
                    <img src={`https://image.tmdb.org/t/p/w200/${props.poster}`} />
                    <div style={{display: "flex", flexDirection:"column", justifyContent: "space-between"}}>
                        <p>{props.name}</p>
                        <span>{props.type}</span>
                    </div>
                </div>
            </NavLink>
        </>
    )
}
export default Option;