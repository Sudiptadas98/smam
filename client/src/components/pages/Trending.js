import { useEffect, useState } from "react";
import { API_URL, API_KEY } from "../Config";
import Moviecard from "./Moviecard";
const Trending = ({ home, loadmfh }) => {
    const [content, setContent] = useState([]);
    const [currentpage, setCurrentpage] = useState();

    useEffect(() => {
        const endpoint = `${API_URL}trending/all/week?api_key=${API_KEY}`
        fetchApi(endpoint);
    }, [])

    const fetchApi = async (path) => {
        try {
            const url = path
            const res = await fetch(url);
            const data = await res.json();
            // const data = [resJson];
            // console.log(data);
            setContent([...content, ...data.results]);
            setCurrentpage(data.page);
        } catch (err) {
            console.log(err);
        }
    }

    const LoadMore = () => {
        const endpoint = `${API_URL}trending/all/week?api_key=${API_KEY}&page=${currentpage + 1}`
        fetchApi(endpoint);
    }
    // console.log(content);
    return (
        <>
            <div className={home === "home" ? "trendinghome trending" : "trendingmain trending"}>
                <h1>Trending Now..</h1>
                <div className="moviecardsec">
                    {content && content.map((c) =>
                    (<Moviecard
                        key={c.id}
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title || c.name}
                        media_type={c.media_type}
                        date={c.release_date}
                        vote_average={c.vote_average} />))}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button style={{ display: home === "home" ? "none" : "block"}} className="homesmbtn" onClick={LoadMore}>Load More</button>
                </div>
            </div>
        </>
    )
}
export default Trending;