import {NavLink} from "react-router-dom";
import notfound from "./assests/404notfound.svg";
const Errorpage = () => {
    return (
        <>
            <div className="notfound">
                <img src={notfound}/>
                <h3>Page Not Found</h3>
                <NavLink to="/" className="backtohome">Back to home</NavLink>
            </div>
        </>
    )
}
export default Errorpage;