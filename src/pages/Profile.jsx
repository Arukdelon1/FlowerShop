import React, {useState} from "react";
import {useContext, useEffect} from "react";
import {firebaseService} from "../context/FirebaseService";
import Login from "./Login";
import {UserContext} from "../context/UserContext";
import {Button} from "react-bootstrap";
import {LOCALSTORE_USER} from "../models/constants";

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const logOut = (e) => {
        firebaseService.logout()
            .then(() => {
                setUser({
                    email: "",
                    password: "",
                    auth: null,
                    firebaseUser: null,
                });
            });
        window.localStorage.setItem(LOCALSTORE_USER, JSON.stringify(""));
    };
    const checkUser = () => {
       console.log(user);
    };



    return (
        <div className="container-fluid">
            {user.email.toString()}
            <Button onClick={e => logOut(e)}>Вийти</Button>
            <Button onClick={checkUser}>Info</Button>
        </div>
    );
}

export {Profile}