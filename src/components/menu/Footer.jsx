import React from "react"

const Footer = () => <footer className="page-footer font-small blue pt-4" style={{position: "relative", left: "0", right: "0", bottom: "0", backgroundColor: "black"}}>
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase" style={{color: "lightgray"}}>Інтернет-магазин квітів</h5>
                <p style={{color: "lightgray", paddingTop: "10px"}}>З любов'ю до квітів</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase" style={{color: "lightgray"}}>Чекаємо ваших дзвінків</h5>
                <ul className="list-unstyled">
                    <li><a style={{color: "lightgray"}}>+380666366175</a></li>
                    <li><a style={{color: "lightgray"}}>+380984455465</a></li>

                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase" style={{color: "lightgray"}}>Місце знаходження</h5>
                <ul className="list-unstyled">
                    <li><a style={{color: "lightgray"}}>м. Івано-Франківськ вул. Захарченка 456</a></li>
                </ul>
            </div>
        </div>
    </div>

    <div className="footer-copyright text-center py-3" style={{color: "lightgray"}}>© 2022 Copyright</div>

</footer>

export default Footer