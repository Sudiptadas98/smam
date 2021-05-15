import logif from "../assests/loading2.gif";
const Loading2 = () => {
    return(
        <>
        <div className="loading2page">
            <img src={logif}/>
            <p>Loading, please wait...</p>
            <span>If it takes too long then please refresh the page.</span>
        </div>
        </>
    )
}
export default Loading2;