import React from 'react';
import {Navbar, Container, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <Navbar expand={"lg"} bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as = {Link} to="/">Інтернет-магазин квітів</Navbar.Brand>
                <Navbar.Toggle aria-controls={"basic-navbar-nav"}/>
                <Navbar.Collapse id={"basic-navbar-nav"} className={"justify-content-lg-start"}>
                <Nav className="navbar navbar-dark bg-dark">
                    <Nav.Link as = {Link} to="about">Про нас</Nav.Link>
                    <Nav.Link as = {Link} to="user">Кабінет</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;