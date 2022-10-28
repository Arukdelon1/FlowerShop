import React from 'react';
import {Navbar, Container, Nav} from "react-bootstrap";

const Menu = () => {
    return (
        <Navbar expand={"lg"} bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Інтернет-магазин квітів</Navbar.Brand>
                <Navbar.Toggle aria-controls={"basic-navbar-nav"}/>
                <Navbar.Collapse id={"basic-navbar-nav"} className={"justify-content-lg-start"}>
                <Nav className="navbar navbar-dark bg-dark">
                    <Nav.Link href="about">Про нас</Nav.Link>
                    <Nav.Link href="user">Кабінет</Nav.Link>
                </Nav>
            </Navbar.Collapse>
                <Navbar.Text><a className={"AdditionText"}>Створено з любов'ю до квітів</a></Navbar.Text>
            </Container>
        </Navbar>
    );
};

export default Menu;