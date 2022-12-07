import {useContext, useEffect} from "react";
import {firebaseService} from "../context/FirebaseService";
import Login from "./Login";
import {UserContext} from "../context/UserContext";
import {Profile} from "./Profile";

const UserPage = () => {
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {

    }, []);

    return (
        <div className="container-fluid" style={{position:"relative", marginTop:"174px",marginBottom:"175px"}}>
            {user && user.auth ? <Profile/> : <Login/> }
        </div>
    );
}

export {UserPage}