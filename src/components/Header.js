import React, {useContext, useEffect} from "react";
import Menu from "./menu/Menu";
import {firebaseService} from "../context/FirebaseService";
import {LOCALSTORE_TOTALITEMS, LOCALSTORE_USER} from "../models/constants";
import {UserContext} from "../context/UserContext";




const Header = () => {
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        if(user.auth !== null)
        {
            return;
        }

        let userLocal = window.localStorage.getItem(LOCALSTORE_USER);
        userLocal = userLocal ? JSON.parse(userLocal) : userLocal;
        setUser(userLocal);
    }, []);

    useEffect(()=>{
        if(user && user.auth !== null) {
            window.localStorage.setItem(LOCALSTORE_USER, JSON.stringify(user));
        }

    }, [user]);
    return(
        <header>
            <div className={""}>
                <Menu/>
            </div>
        </header>
    )
}
export {Header}