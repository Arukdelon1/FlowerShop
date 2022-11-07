import React from "react";
import ShopCard from "../components/cards/ShopCard";
import {Col} from "react-bootstrap";
import {Row} from "react-bootstrap";

const itemList = [
    {id: 1, imgurl:"images/flower1.jpg", title:"Тюльпан Тріумф Mata Hari", code:"44907", t_status:"в наявності", count:"1"},
    {id: 2, imgurl:"images/flower2.jpg", title:"Крокус кімнатний", code:"55537", t_status:"в наявності", count:"4"},
    {id: 3, imgurl:"images/flower3.jpg", title:"Гіацинт садовий Aqua", code:"90586", t_status:"в наявності", count:"3"},
    {id: 4, imgurl:"images/flower4.jpg", title:"Гінкго Білоба Дволопатеве", code:"25603", t_status:"в наявності", count:"2"}
]
const Cards = () => {
    return(
        <div>
            <section className="container">
                <Row xs={1} md={4} className="g-1">
                    {itemList.map(item => {
                            return(
                                <Col key={item.id}>
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