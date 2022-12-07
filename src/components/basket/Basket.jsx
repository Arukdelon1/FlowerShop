import React, {useEffect, useState} from "react";
import {useShoppingCart} from "../../context/ShoppingCartContext";
import {firebaseService} from "../../context/FirebaseService";
import {Button, Card, Col, Row} from "react-bootstrap";
import ShopCard from "../cards/ShopCard";




const Basket = () => {
    const {totalItems} = useShoppingCart()
    const [sum, setSum] = useState(0)

    useEffect(() => {
        let val = 0;
        totalItems.map(item => {
            val = val +  parseInt(item.itemP.price) * parseInt(item.quantity);
        })
        setSum(val)
    }, []);

    return(
        <div className="container" style={{paddingTop:"100px",paddingBottom:"100px"}}>
            <section className="container">
            {totalItems.map( item => (
                <div  style={{backgroundColor: "white", margin:"10px",borderRadius: "10px",marginLeft:"200px",marginRight:"200px"}}>
                    <Card >
                        <Row>
                            <Col style={{justifyItems:"left"}}>
                                <Card.Img  style={{width:"90px",position:"absolute", left:"5px",top:"5px"}} src={item.itemP.imageURL}></Card.Img>
                            </Col>
                            <div style={{position:"absolute",  left:"-200px", top: "20px"}}><h4>{item.itemP.name}</h4></div>
                            <div style={{position:"absolute",  left:"280px", top: "60px"}}><h5>Ціна: <strong style={{color: "orangered"}}>{item.itemP.price} х {item.quantity} = {item.itemP.price * item.quantity}</strong> грн</h5></div>
                            <Col style={{justifyItems:"left"}}>
                                <div style={{height:"100px"}}></div>
                            </Col>
                        </Row>
                    </Card>
                </div>
            ))
            }
                <div  style={{backgroundColor: "white", margin:"10px",borderRadius: "10px",marginLeft:"200px",marginRight:"200px"}}>
                <Card >
                    <Row>
                        <Col style={{justifyItems:"left"}}>
                        </Col>
                        <div style={{position:"absolute",  left:"280px", top: "60px"}}><h5>Сума: <strong style={{color: "orangered"}}>{sum}</strong> грн</h5></div>
                        <Col style={{justifyItems:"left"}}>
                            <div style={{height:"100px"}}></div>
                        </Col>
                    </Row>
                </Card>
                </div>
            <Button variant={"warning"} className={"a"}><h3>Оплатити</h3></Button>
            </section>
        </div>
    )
}
export {Basket}