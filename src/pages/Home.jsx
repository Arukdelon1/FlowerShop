
import ShopCard from "../components/cards/ShopCard";
import {Col} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {firebaseService} from "../context/FirebaseService";

const itemList = [
    {imageURL:"images/flower1.jpg", name:"Тюльпан Тріумф Mata Hari", code:"44907"}
]

const Cards = () => {

    const [items, setItems] = useState(null)
    useEffect(() => {
        setItems(firebaseService.getProducts(firebaseService.db));
    }, []);

    return(
        <div>
            <section className="container">
                <Row xs={1} md={"auto"} className="justify-content-md-center">
                    {itemList.map(item => {
                            return(
                                <Col key={item.code} style={{padding: "12px"}} className={""}>
                                    <ShopCard card={item}/>
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
            <Cards />
            <br/>
        </div>
    )
}

export {Home}