import { Link } from "react-router-dom";

function ErrorPage(){
    return (
        <>
            <h1>Whoops! Something went wrong!</h1>
            <Link to="/">Go back to the homepage</Link>
        </>
    )
}

export default ErrorPage;