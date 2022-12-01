import React, {useState} from "react";
import Message from "../components/messages/Message";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {firebaseService} from "../context/FirebaseService";

import storage from "../firebase"

const metadata = {
    contentType: 'image/jpeg'
};




const AddProduct = () => {

    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);

    function handleUpload() {
        if (!file) {
            alert("Please choose a file first!")
        }
        const storageRef = ref(firebaseService.storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
        "state_changed",
        (snapshot) => {
            const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setPercent(percent);
        },
        (err) => console.log(err),
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log(nameInput);
                console.log(url);
                firebaseService.UploadProduct(nameInput, url);
            });
        }
    );
}

    const [nameInput, setNameInput] = useState("");
    const [nameError, setNameError] = useState("");
    const [isUpload, setIsUpload] = useState(false);


    const UploadData = ({target: {files}}) => {
        console.log(files[0]);
        setFile(files[0]);
        setIsUpload(true);
    }


    return(
        <div className="rowjustify-content-center container">
            <Row>
                <Col className="main-min-height row align-items-center justify-content-end" sm={4}>
            <Card style={{ width: '18rem' }}>
                {isUpload ?
                    <Card.Img className="justify-content-center" style={{marginTop: "20px"}} variant="top" src={URL.createObjectURL(file)} /> : ""
                }
                {!isUpload ?
                    <Card.Img variant="top" src="no-photo-small.jpg"  /> : ""
                }
                <Card.Body>
                    <div>{percent} "% done</div>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control type="file" onChange={UploadData}/>
                    </Form.Group>
                </Card.Body>
            </Card>
                </Col>
                <Col sm={8}>
            <Form className="row" >
                <Form.Group className="mb-4 col-12" controlId="productName">
                    <Form.Label className="float-start">Назва товару</Form.Label>
                    <Form.Control type="text" placeholder="Назва"
                                  value={nameInput}
                                  onChange={e => setNameInput(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {nameError}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form>
                </Col>
            </Row>
            <div><Button onClick={handleUpload}>Загрузити на сайт</Button></div>
        </div>

    )
}
export {AddProduct}