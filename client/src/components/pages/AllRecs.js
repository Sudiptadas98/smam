import { useEffect, useState } from "react";
import Rec from "./Rec";
import Loading from "./Loading";

const AllRecs = () => {
    const [allrecs, setAllrecs] = useState([]);
    const [uId, setUid] = useState();
    const [load, setLoad] = useState(true);
    const callAllRecPage = async () => {
        try {
            const res = await fetch("/allposts", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            setLoad(false);
            // console.log(data.posts);
            setAllrecs(data.posts);

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

            setUid(data._id);




            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            // console.log(err);

        }
        // console.log(favs);


    }




    useEffect(() => {
        callAllRecPage();
        getUser();
    }, []);


    return (
        <>  {load ? <Loading /> :
            <div className="recommendations">
                <h1>Reccomendations..</h1>
                <div className="allrecs">
                    {allrecs && allrecs.map((c) => (
                        <Rec
                            key={c._id}
                            id={c._id}
                            mid={c.mid}
                            mtype={c.mtype}
                            body={c.body}
                            postedBy={c.postedBy}
                            date={c.date}
                            likes={c.likes}
                            uid={uId} />
                    ))}
                </div>
            </div>
        }
        </>
    )
}
export default AllRecs;