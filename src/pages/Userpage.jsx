import {useContext, useEffect} from "react";
import {firebaseService} from "../context/FirebaseService";
import Login from "./Login";
import {UserContext} from "../context/UserContext";
import {Profile} from "./Profile";

const UserPage = () => {
    const { user, setUser } = useContext(UserContext);
    console.log("user", user);

    useEffect(() => {

    }, []);

    return (
        <div className="container-fluid">
            {user.auth ? <Profile/> : <Login/> }
        </div>
    );
}

export {UserPage}