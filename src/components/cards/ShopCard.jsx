import React from 'react';
import {Card, Button, ListGroup} from "react-bootstrap";

const ShopCard = (props) => {
    return (
        <Card>
            <Card.Img variant="top"  className={"CItem"} src={props.card.imgurl} />
            <Card.Body>
                <Card.Title>{props.card.title}</Card.Title>
                <Card.Text>
                    {props.card.description}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush StrT">
                <ListGroup.Item className={"d-flex justify-content-between"}>Код товару<span className="StrL">{props.card.code}</span></ListGroup.Item>
                <ListGroup.Item className={"d-flex justify-content-between"}>На складі<span className="">{props.card.t_status}</span></ListGroup.Item>
                <ListGroup.Item className={"d-flex justify-content-between"}>К-сть в упаковці<span className="">{props.card.count}</span></ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Button variant="outline-secondary">Купити</Button>
            </Card.Body>
        </Card>
    );
};

export default ShopCard;