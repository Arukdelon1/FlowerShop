import React, {useContext, useEffect, useState} from "react";
import Message from "../components/messages/Message";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {firebaseService} from "../context/FirebaseService";

import storage from "../firebase"
import {useShoppingCart} from "../context/ShoppingCartContext";
import {UserContext} from "../context/UserContext";
import {useNavigate} from "react-router-dom";

const metadata = {
    contentType: 'image/jpeg'
};




const AddProduct = () => {

    const { categoryArray } = useShoppingCart();

    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);
    const [discountBool, setDiscountBool] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [discount, setDiscountInput] = useState(0);
    const [priceInput, setPriceInput] = useState(0);
    const [categoryInput, setCategoryInput] = useState("");
    const [categoryInputOptions, setCategoryInputOptions] = useState([]);
    const [nameError, setNameError] = useState("");
    const [discountError, setDiscountError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [categoryError, setCategoryError] = useState("");
    const [imageError, setImageError] = useState("");
    const [isUpload, setIsUpload] = useState(false);
    const [isSend, setIsSend] = useState(false);

    const {user} = useContext(UserContext);

    function LoadCategory()
    {
        if(categoryInputOptions.length === undefined || categoryInputOptions.length === 0)
        {
            setCategoryInputOptions(categoryArray);
        }
    }
    let navigate = useNavigate();
    const routeChange = () =>{
        let path = `/`;
        navigate(path);
    }

    useEffect(() => {
        LoadCategory();
    }, []);


    function handleUpload() {
        console.log("Adding produnc")
        let isError = false;
        setNameError("");
        setPriceError("");
        setDiscountError("");
        setCategoryError("");
        setImageError("");
        setIsSend(true);
        if (nameInput.length < 2) {
            setNameError("Введіть назву");
            isError = true;
        }
        if (categoryInput.length === 0) {
            setCategoryError("Виберіть категорію");
            isError = true;
        }
        if (priceInput <= 0) {
            setPriceError("Введіть ціну");
            isError = true;
        }
        if (discountBool && discount <= 0 || discount >= 100 ) {
            setDiscountError("Не виходіть за поріг від 0 до 100");
            isError = true;
        }
        if (!file) {
            setImageError("Виберіть картинку");
            isError = true;
        }
        if(isError) {
            return;
        }

        if(!discountBool) {
            setDiscountInput(0);
            console.log("Without disocunt")
        }


        console.log("sec Adding produnc")
        const storageRef = ref(firebaseService.storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
        "state_changed",
        (snapshot) => {
        },
        (err) => console.log(err),
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                firebaseService.UploadProduct(nameInput,priceInput,categoryInput, discount, user.auth.user.uid , url);
            });
        }
    );
        console.log("produnc added")
        routeChange();
}



    const UploadData = ({target: {files}}) => {
        if(files[0] === undefined) {
            return
        }
        console.log(files[0]);
        setFile(files[0]);
        setIsUpload(true);
    }
    const onSwitchAction = () => {
        setDiscountBool(!discountBool);
    };


    return(
        <div className=" container justify-content-center" style={{paddingTop:"100px", paddingBottom:"185px"}}>
            <Row>
                <Col className="row justify-content-end" sm={4}>
            <Card style={{ width: '18rem', height: '23rem'}}>
                {isUpload ?
                    <Card.Img  style={{marginTop: "10px"}} variant="top" src={URL.createObjectURL(file)} /> : ""
                }
                {!isUpload ?
                    <Card.Img style={{marginTop: "10px"}}  variant="top" src="no-photo-small.jpg"  /> : ""
                }
                <Card.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control accept=".png, .jpg, .jpeg" type="file"
                                      onChange={UploadData}
                                      isValid={isSend && imageError.length === 0}
                                      isInvalid={isSend && imageError.length > 0}/>
                        <Form.Control.Feedback type="invalid">
                            {imageError}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Card.Body>
            </Card>
                </Col>
                <Col sm={8}>
            <Form className="row" >
                <Form.Group className="mb-4 col-12" controlId="productNane">
                    <Form.Label className="float-start">Назва товару</Form.Label>
                    <Form.Control type="text" placeholder="Назва"
                                  value={nameInput}
                                  onChange={e => setNameInput(e.target.value)}
                                  isValid={isSend && nameError.length === 0}
                                  isInvalid={isSend && nameError.length > 0}
                    />
                    <Form.Control.Feedback type="invalid">
                        {nameError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4 col-12" controlId="productName">
                    <Form.Label className="float-start">Ціна товару</Form.Label>
                    <Form.Control type="number" placeholder="Ціна"
                                  value={priceInput}
                                  onChange={e => setPriceInput(e.target.value)}
                                  isValid={isSend && priceError.length === 0}
                                  isInvalid={isSend && priceError.length > 0}
                    />
                    <Form.Control.Feedback type="invalid">
                        {priceError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4 col-12" controlId="category">
                    <Form.Label className="float-start">Категорія</Form.Label>
                    <Form.Select aria-label="Категорія" placeholder="Категорія"
                                 value={categoryInput}
                                 onChange={e => setCategoryInput(e.target.value)}
                                 isValid={isSend && categoryError.length === 0}
                                 isInvalid={isSend && categoryError.length > 0}
                                 onClick={LoadCategory}
                    >
                        <option value="">Категорія</option>
                        {categoryInputOptions.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {categoryError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4 col-12 align-items-start" controlId="switch">
                    <Form.Label className="float-start">Знижка</Form.Label>
                    <Form.Check
                        onChange={onSwitchAction}
                        checked={discountBool}
                        style={{paddingLeft: "50px"}}
                        className={"d-flex"}
                        type="switch"
                        id="custom-switch"
                    />
                    {discountBool ?
                        <Form.Control type="number" placeholder="Кількість у %"
                                      value={discount}
                                      onChange={e => setDiscountInput(e.target.value)}
                                      isValid={isSend && discountError.length === 0}
                                      isInvalid={isSend && discountError.length > 0}
                        />:null
                    }
                    <Form.Control.Feedback type="invalid">
                        {discountError}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form>
                </Col>
            </Row>
            <div><Button onClick={handleUpload}>Добавити товар</Button></div>
        </div>

    )
}
export {AddProduct}