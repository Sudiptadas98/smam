import { useEffect, useRef, useState } from "react";

import { API_URL, API_KEY } from "../Config";

import Option from "./Option";

const Search = () => {
    
    const [showop, setShowop] = useState(false);
    const [searchtext, setSearchtext] = useState("");
    const [content, setContent] = useState([]);

    

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const url = `${API_URL}search/multi?api_key=${API_KEY}&query=${searchtext}`
                const res = await fetch(url);
                const data = await res.json();

                // console.log(data.results);
                setContent(data.results);
            } catch (err) {
                
                // const mute = err;
                // console.log(err);
            }
        }
        fetchApi();



        document.addEventListener("click", (e) => {
            setShowop(false);
        });


    }, [searchtext])

    const handleChange = (e) => {
        setSearchtext(e.target.value);
        setShowop(true);
    }


    return (
        <>
            <div className="searchsec">
                <div className="search">
                    <div>
                        <input value={searchtext} onChange={handleChange} type="search" />
                    </div>
                    <div style={{ display: showop ? "block" : "none" }} className="searchoptions">
                        {content && content.map((c) => (
                            <Option key={c.id} id={c.id} name={c.title || c.name} type={c.media_type} poster={c.poster_path} />
                        ))}

                    </div>
                </div>
                {/* <i style={{ margin: "3.7px 8px 0 -20px" }} className="fas fa-search"></i> */}
            </div>
        </>
    )
}
export default Search;