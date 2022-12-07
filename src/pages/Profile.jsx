import React, {useState} from "react";
import {useContext, useEffect} from "react";
import {firebaseService} from "../context/FirebaseService";
import Login from "./Login";
import {UserContext} from "../context/UserContext";
import {Button, Row, Col, Card, Form} from "react-bootstrap";
import {LOCALSTORE_USER} from "../models/constants";

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const [ createDate, setCreateDate ] = useState("");
    const logOut = (e) => {
        firebaseService.logout()
            .then(() => {
                setUser({
                    email: "",
                    surname: "",
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
        <div className="main-min-height row align-items-center justify-content-center" style={{paddingBottom:"58px"}}>
            <div>
            <Row>
                <Col sm={"2"}  className={""} style={{justifyItems:"right"}}>
                </Col>
                <Col sm={"5"}  className={""} style={{justifyItems:"right"}}>
                    <div style={{textAlign:"left", fontSize:"20px"}}>
                        <strong>
                            Електронна пошта: <a style={{color:"darkolivegreen"}}>{user.email}</a>
                        </strong>
                        <br/>
                        <br/>
                        <strong>
                            <Row>
                                <Col  >Ім:я: <a style={{color:"darkolivegreen"}}>{user.name}</a></Col>
                                <Col  >Прізвище: <a style={{color:"darkolivegreen"}}>{user.surname}</a></Col>
                            </Row>
                        </strong>
                        <br/>
                        <strong>
                            <Row>
                                <Col  >Дата створення:<br/> <a style={{color:"darkolivegreen"}}>
                                    {Intl.DateTimeFormat('uk-UA', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(user.auth.user.createdAt)}
                                </a></Col>
                                <Col  >Дата останнього входу:<br/> <a style={{color:"darkolivegreen"}}>
                                    {Intl.DateTimeFormat('uk-UA', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(Date.now())}
                                </a></Col>
                            </Row>
                        </strong>
                    </div>
                </Col>
                <Col sm={"5"} className={"justify-content-lg-start"}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="no-photo-small.jpg"  />
                    </Card>
                </Col>
            </Row>

            </div>
        </div>
    );
}

export {Profile}