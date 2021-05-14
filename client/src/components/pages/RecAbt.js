import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Loading from "./Loading";
import Rec from "./Rec";
const RecAbt = ({ match }) => {
    const postId = match.params.recid;
    const [recabt, setRecabt] = useState();
    const [uId, setUid] = useState();
    const [load, setLoad] = useState(true);
    const [commentText, setCommentText] = useState();
    const [allcomments, setAllcomments] = useState([]);
    const history = useHistory();



    const callRecPage = async () => {
        try {
            const res = await fetch("/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    postId
                })
            });

            const data = await res.json();
            // setLoad(false);
            // console.log(data);
            setRecabt(data.post);
            setAllcomments(data.post.comments);
            // setLoad(false);

        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {



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

                setLoad(false);


                if (!res.status === 200) {
                    const error = new Error(res.error);
                    throw error;
                }

            } catch (err) {
                // console.log(err);
                history.push("/login");
            }
            // console.log(favs);


        }


        getUser();
        callRecPage();
    }, []);

    const handleInputs = (e) => {
        const value = e.target.value;
        setCommentText(value);
    }



    const ForComment = async (e) => {
        e.preventDefault();
        const text = commentText;
        if (text != null) {
            const res = await fetch("/comment", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    postId, text
                })
            });

            const data = await res.json();
            // console.log(data);
            if (res.status === 422 || !data) {
                window.alert("Invalid details");
                console.log("Invalid details");
            } else {
                window.alert("Commented");
                console.log("Commented");

                setCommentText("");

                // history.push("/recommendations");
            }
            window.scroll({
                top: document.body.offsetHeight,
                left: 0,
                behavior: 'smooth',
            });
        } else if (text == null) {
            window.alert("write something first");
        }


        // console.log(postdata);
        callRecPage();

    }



    //fordelete
    const fordelete = async (e) => {
        e.preventDefault();
        const answer = window.confirm("You want to delete this post?");
        if(answer){
            try {
            
                const res = await fetch("/deletepost", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/Json"
                    },
                    body: JSON.stringify({
                        postId
                    })
                });
                const data = await res.json();
                if (data) {
                    console.log("post deleted");
                    alert("post deleted");
                    history.push("/recommendations");
                } else {
    
                    // setUserData({...userData, message:""});
                }
    
            } catch (err) {
                console.log(err);
                // history.push("/login");
            }
        }
        
        
    }


    // console.log(allcomments);
    // setAllcomments(recabt.comments)
    return (
        <>{
            load ? <Loading /> :
                <div className="recabt">
                    <div className="recabtrecsec">
                        {recabt &&
                            <Rec
                                key={recabt._id}
                                id={recabt._id}
                                mid={recabt.mid}
                                mtype={recabt.mtype}
                                body={recabt.body}
                                postedBy={recabt.postedBy}
                                date={recabt.date}
                                likes={recabt.likes}
                                uid={uId} />
                        }
                        {recabt && recabt.postedBy._id == uId ?
                            <i onClick={fordelete} class="far fa-trash-alt"></i>
                            : null
                        }
                    </div>
                    <form onSubmit={ForComment} className="commentsec">
                        <textarea onChange={handleInputs} value={commentText} type="text" placeholder="comment here.." className="commentinpt" />
                        <button className="cmntsubmitbtn">Comment</button>
                    </form>
                    <div className="allcomments">
                        {
                            allcomments && allcomments.map((c) => (
                                <div className="comment">
                                    <span>@{c.postedBy.name}:</span>
                                    <p>{c.text}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
        }

        </>
    )
}
export default RecAbt;