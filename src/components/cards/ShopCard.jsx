import React, {useEffect} from 'react';
import {useShoppingCart} from "../../context/ShoppingCartContext";
import {useState} from "react";
import {Button, Card} from "react-bootstrap";

const ShopCard = (props) => {
    const ItemInfo = () => {
        console.log(props.card)
    }

    const [isHower, setIsHower] = useState(false);
    const [quantity, setQuantity] = useState(null);


    const {increaseCartQuantity} = useShoppingCart()

    function IncQua()
    {
        setQuantity(quantity + 1);
    }
    function DecQua()
    {
        if(quantity < 2) return;
        setQuantity(quantity - 1);
    }




    const AddItem = () => {
        props.card.code = props.skey;
        console.log(props.card.code);
        increaseCartQuantity(props.card, quantity);
    }

    useEffect(()=>{
        setQuantity(1);
    },[]);


    return (
        <Card style={{ width: '20rem', height: "28rem",  borderRadius: "0"}} onMouseEnter={() => setIsHower(!isHower)} onMouseLeave={() => setIsHower(!isHower)}>
            <Card.Img variant="top"  style={{ width: '100%', height: "80%", borderRadius: "0" }}  className={"CItem"} src={props.card.imageURL} onClick={ItemInfo} />
            <Card.Body>
                <Card.Title><div  style={{fontSize: "17px"}}>{props.card.name}</div>
                    <div className={"float-start"}><strong>Ціна:</strong> від {props.card.price} грн/шт</div>
                </Card.Title>
                <Card.Text>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <div className={"d-flex justify-content-lg-center "}>
                {isHower &&
                    <div className={"d-flex justify-content-center"} style={{ verticalAlign: "middle",alignItems: "center", paddingRight: "8px"}}>
                        <Button variant="light" onClick={DecQua} style={{marginRight: "10px"}} className={"bton"}>
                            <svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20"
                                 className="bi bi-dash" viewBox="3 4 10 10">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                            </svg></Button>
                        <h4 style={{  height: "1.24em", display: "flex", alignItems: "center"}} className={"d-flex position-absolute"}>{quantity}</h4>
                        <Button variant="light"  onClick={IncQua} style={{marginLeft: "10px"}} className={"bton"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                 className="bi bi-plus" viewBox="3 4 10 10">
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg></Button>
                    </div>
                }
                    <Button variant="outline-secondary"  onClick={AddItem}>В кошик</Button>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default ShopCard;