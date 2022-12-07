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
        console.log(props.skey);
        props.card.code = props.skey;
        increaseCartQuantity(props.card, quantity);
    }

    useEffect(()=>{
        setQuantity(1);
    },[]);


    return (
        <Card style={{ width: '14.4rem',  borderRadius: "0"}} onMouseEnter={() => setIsHower(!isHower)} onMouseLeave={() => setIsHower(!isHower)}>
            <Card.Img variant="top"  style={{ width: '100%', height: "80%", borderRadius: "0" }}  className={"CItem"} src={props.card.imageURL} onClick={ItemInfo} />
            {props.card.discount > 0 ?
                <div className={"position-absolute"} style={{marginTop: "10px",marginLeft: "3px", paddingLeft: "5px",paddingRight: "5px", fontSize: "20px",
                    fontWeight: "bold", color: "white", backgroundColor: "red", borderRadius: "5px"}}>-{props.card.discount}%</div> : null
            }
            <Card.Body>
                <Card.Title><div  style={{fontSize: "16.1px"}}>{props.card.name}</div>
                    <div className={"float-start"} style={{fontSize: "16px"}}><strong>Ціна:</strong> від {props.card.price} грн/шт</div>
                </Card.Title>
            </Card.Body>
            <Card.Footer>
                <div className={"d-flex justify-content-lg-center "}>
                {isHower &&
                    <div className={"d-flex justify-content-center"} style={{ verticalAlign: "middle",alignItems: "center", paddingRight: "8px"}}>
                        <Button variant="light" onClick={DecQua} style={{marginRight: "5px"}} className={"bton"}>
                            <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16"
                                 className="bi bi-dash" viewBox="3 4 10 10">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                            </svg></Button>
                        <h4 style={{  height: "1.24em", display: "flex", alignItems: "center"}} className={"d-flex position-absolute"}>{quantity}</h4>
                        <Button variant="light"  onClick={IncQua} style={{marginLeft: "5px"}} className={"bton"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                 className="bi bi-plus" viewBox="3 4 10 10">
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg></Button>
                    </div>
                }
                    <Button variant="success" onClick={AddItem}>В кошик</Button>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default ShopCard;