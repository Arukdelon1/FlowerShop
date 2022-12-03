
import ShopCard from "../components/cards/ShopCard";
import {Col} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {firebaseService} from "../context/FirebaseService";
import {useShoppingCart} from "../context/ShoppingCartContext";

const itemList = [
    {imageURL:"images/flower1.jpg", name:"Тюльпан Тріумф Mata Hari", code:"44907"}
]

const Cards = () => {
    const {items, setItems} = useShoppingCart()
    useEffect(() => {
        if(items.length === undefined) {
            firebaseService.getProducts(firebaseService.db).then((doc) => {
                setItems(doc);
            })
        }

    }, []);

    return(
        <div>
            <section className="container">
                <Row xs={1} md={"auto"} className="justify-content-md-center">
                    {Array.from(items).map(item => {
                        return(
                            <Col key={item[1]} style={{padding: "12px"}} className={""}>
                                <ShopCard skey={item[1]} card={item[0]}/>
                            </Col>

                        )})}
                </Row>
            </section>
        </div>
    )
}

const Home = () => {
    return(
        <div className="container">
            <br/>
            <h2>Акції та знижки</h2>
            <Cards  />
            <br/>
        </div>
    )
}

export {Home}