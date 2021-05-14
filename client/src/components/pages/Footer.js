import {NavLink} from "react-router-dom";
const Footer = () => {
    return (
        <>
            <div className="footersec">
                <div className="footer">
                    <div className="logopart">
                        <i className="fas fa-film"></i>
                        <div className="logoparttext">
                            <div style={{ display: "flex" }}>
                                <h1>S</h1>
                                <p>UGGEST</p>
                            </div>
                            <div style={{ display: "flex" }}>
                                <h1>M</h1>
                                <p>E</p>
                            </div>
                            <div style={{ display: "flex" }}>
                                <h1>A</h1>

                            </div>
                            <div style={{ display: "flex" }}>
                                <h1>M</h1>
                                <p>OVIE</p>
                            </div>
                        </div>
                    </div>
                    <div className="mypart">
                        <p>Created By-</p>
                        <h2>Sudipta Das</h2>
                        <div>
                           <NavLink target="_blank" to={`//www.linkedin.com/in/thesudiptadas/`}><i className="fab fa-linkedin"></i></NavLink>
                           <NavLink target="_blank" to={`//github.com/Sudiptadas98`}><i className="fab fa-github"></i></NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer;