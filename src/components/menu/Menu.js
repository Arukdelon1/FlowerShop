
import {Navbar, Container, Nav, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useShoppingCart} from "../../context/ShoppingCartContext";
import { useNavigate } from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";


const Menu = () => {
    const {OpenCart, cartQuantity} = useShoppingCart();
    const {user} = useContext(UserContext)

    let navigate = useNavigate();
    const userRoute = () =>{
        let path = `user`;
        navigate(path);
    }
    const addProductRoute = () =>{
        let path = `addProduct`;
        navigate(path);
    }

    return (
        <Navbar sticky={"top"} expand={"lg"} bg="dark" variant="dark" className={"mb-1"}>
            <Container>
                <Navbar.Brand as = {Link} to="/">Інтернет-магазин квітів</Navbar.Brand>
                <Navbar.Toggle aria-controls={"basic-navbar-nav"}/>
                <Navbar.Collapse id={"basic-navbar-nav"} className={"justify-content-lg-start"}>
                <Nav className="navbar navbar-dark bg-dark me-auto">
                    <Nav.Link as = {Link} to="about">Про нас</Nav.Link>
                </Nav>
                    {user && user.auth && user.role === "salesman"  ?
                    <Button onClick={addProductRoute} className={"btn-add btn--doar "} style={{marginRight: "10px"}}
                            variant={"outline-light"}>
                        ДОДАТИ ТОВАР
                    </Button>:null
                    }
                    <Button onClick={OpenCart} style={{width: "3rem",height: "3rem", position: "relative"}} variant={"outline-light"} className={"rounded-circle"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                             className="bi bi-basket3-fill" viewBox="0 0 16 16">
                            <path
                                d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z"/>
                        </svg>
                        <div
                            className={"rounded-circle bg-danger d-flex justify-content-center align-items-center"}
                            style={{color:"white",width: "1.5rem", height: "1.5rem", position: "absolute", bottom: 0, right: 0, transform: "translate(25%, 25%)"}}
                        >{cartQuantity}</div>
                        </Button>
                    <Button onClick={userRoute} style={{width: "3rem",height: "3rem", position: "relative", marginLeft: "10px"}} variant={"outline-light"} className={"rounded-circle"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                             className="bi bi-person" viewBox="0 0 16 16">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                        </svg>
                    </Button>

            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;