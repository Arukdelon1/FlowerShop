import React from 'react';
import { LOCALSTORE_TOTALITEMS } from "../../models/constants";

const BasketComponent = () => {
    const getLocalStore = () => {
        let cardsLocal = window.localStorage.getItem(LOCALSTORE_TOTALITEMS);
        cardsLocal = cardsLocal ? JSON.parse(cardsLocal) : cardsLocal;
        let cards = "Немає вибраних товарів";
        if(cardsLocal && Array.isArray(cardsLocal) && cardsLocal.length > 0) {
            cards = cardsLocal.map(item => {
                return(
                    <div key={item.id}>
                        {item.name}
                    </div>
                );
            });
        }
        return (cards);
    };
    return (
        <div className={"StrL col-4"}>
            <div>
                <div>
                    <h2>Список вибраних товарів</h2>
                </div>
            </div>
            <div>
                <div>
                    {getLocalStore()}
                </div>
            </div>
        </div>
    );
};
export default BasketComponent;