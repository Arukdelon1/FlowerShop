
import ShopCard from "../components/cards/ShopCard";
import {Col} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {firebaseService} from "../context/FirebaseService";
import {useShoppingCart} from "../context/ShoppingCartContext";

const itemList = [
    {imageURL:"images/flower1.jpg", name:"Тюльпан Тріумф Mata Hari", code:"44907"}
]

const Cards = (props) => {
    const {items, setItems} = useShoppingCart()
    const {discountCardId, setDiscountCardId} = useState(0)
    const [discountCards, setDiscountCards] = useState({})


    useEffect(() => {
        if(items.length === undefined) {
            firebaseService.getProducts(firebaseService.db).then((doc) => {
                setItems(doc);
            })
        }




    }, []);


    const getByDiscount= () => {
        const disIt = []
        Array.from(items).forEach(item => {
            if(item[0].discount > 0 && disIt.length < 5) {
                disIt.push(item)
            }

        })
        const content = Array.from(disIt).map((item,index) => (
            <Col key={index} className={""}>
                <ShopCard skey={ item[1]} card={item[0]}/>
            </Col>
        ))
        return (
            <div>
                <h2>Акції та знижки</h2>
                <Row xs={1} md={"auto"} className="justify-content-center">
                    {content}
                </Row>
            </div>
        )
    }

    const getByCategory = (category) => {
        const disIt = []
        Array.from(items).forEach(item => {
            if(item[0].category === category && disIt.length < 5) {
                disIt.push(item)
            }

        })
        const content = Array.from(disIt).map((item,index) => (
            <Col key={index} className={""}>
                <ShopCard skey={ item[1]} card={item[0]}/>
            </Col>
        ))
        return (
            <div>
                <br/>
                <h2>{category}</h2>
                <Row xs={1} md={"auto"} className="justify-content-center">
                    {content}
                </Row>
            </div>
        )
    }

    return(
        <div>
            <section className="container">
                {props.isDiscount ?
                    <Row xs={1} md={"auto"} className="justify-content-center">
                        {getByDiscount()}
                    </Row>:null
                }
                {!props.isDiscount && props.category === "Троянди" ?
                    <Row xs={1} md={"auto"} className="justify-content-center">
                        {getByCategory("Троянди")}
                    </Row>:null
                }
                {!props.isDiscount && props.category === "Аліум" ?
                    <Row xs={1} md={"auto"} className="justify-content-center">
                        {getByCategory("Аліум")}
                    </Row>:null
                }
                {!props.isDiscount && props.category === "Тюльпани" ?
                    <Row xs={1} md={"auto"} className="justify-content-center">
                        {getByCategory("Тюльпани")}
                    </Row>:null
                }
                {!props.isDiscount && props.category === "Нарциси" ?
                    <Row xs={1} md={"auto"} className="justify-content-center">
                        {getByCategory("Нарциси")}
                    </Row>:null
                }
            </section>
        </div>
    )
}

const Home = () => {
    return(
        <div className="container">
            <br/>
            <Cards isDiscount={true} />
            <Cards isDiscount={false} category={"Троянди"}/>
            <Cards isDiscount={false} category={"Аліум"}/>
            <Cards isDiscount={false} category={"Тюльпани"}/>
            <Cards isDiscount={false} category={"Нарциси"}/>
            <br/>
        </div>
    )
}

export {Home}