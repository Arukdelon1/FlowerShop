import {useContext, useEffect} from "react";
import {firebaseService} from "../context/FirebaseService";
import Login from "./Login";
import {UserContext} from "../context/UserContext";

const UserPage = () => {
    const { user, setUser } = useContext(UserContext);
    console.log("user", user);

    useEffect(() => {
        if (firebaseService.auth.currentUser) {
            setUser({...user, email: firebaseService.auth.currentUser.email, password: "true", auth: firebaseService.auth});
        }
    }, []);

    if (user.auth) {
        firebaseService.getCourses()
            .then(courses => console.log("courses", courses));
    }
    return (
        <div className="container-fluid">
            {user.auth ? user.email.toString() : <Login/> }
        </div>
    );
}

export {UserPage}