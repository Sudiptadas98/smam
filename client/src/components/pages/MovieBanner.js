const MovieBanner = (props) => {
    // console.log(props.image);
    const backgroundStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0)39%,rgba(0,0,0,0)41%,rgba(0,0,0,0.65)90%), url("https://image.tmdb.org/t/p/w1280/${props.image}")`
    }
    return (
        <>
            <div className="moviebanner"
                style={{
                    backgroundImage: `${backgroundStyle.backgroundImage}`,
                }}>
                <div className="bannertext">
                    <h1>{props.title}</h1>
                    <p>{props.tagline}</p>
                </div>
            </div>

        </>
    )
}
export default MovieBanner;