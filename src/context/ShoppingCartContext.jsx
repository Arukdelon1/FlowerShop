import {createContext, useContext, useEffect, useState} from "react";
import {LOCALSTORE_TOTALITEMS} from "../models/constants";
import {firebaseService} from "./FirebaseService";

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider({children}) {
    const [isOpen, setIsOpen] = useState(false);
    const [totalItems, setTotalItem] = useState([]);
    const [categoryArray, setCategoryArray] = useState([]);
    const cartQuantity = totalItems.reduce( (quantity, item) => item.quantity + quantity,0 );
    const [items, setItems] = useState({});


    const getLocalStore = () => {
        if(totalItems && totalItems.length > 0)
        {
            return;
        }
        setTotalItem([]);
        let cardsLocal = window.localStorage.getItem(LOCALSTORE_TOTALITEMS);
        cardsLocal = cardsLocal ? JSON.parse(cardsLocal) : cardsLocal;
        if(cardsLocal && Array.isArray(cardsLocal) && cardsLocal.length > 0)
        {
            setTotalItem([...cardsLocal]);
        }
    };
    useEffect(()=>{
        getLocalStore();
        if(categoryArray.length === 0) {
            firebaseService.getCategoryArray(firebaseService.db).then((doc) => {
                setCategoryArray(doc);
            })
        }

    },[]);

    useEffect(()=>{
        if(totalItems.length > 0) {
            window.localStorage.setItem(LOCALSTORE_TOTALITEMS, JSON.stringify(totalItems));
        }

    }, [totalItems]);



    function GetItemQuantity(code){
        return totalItems.find(item => item.code === code)?.quantity||0;
    }

    const OpenCart = () => setIsOpen(true)
    const CloseCart = () => setIsOpen(false)


    function removeFromCart(code) {
        setTotalItem(currItem => {
            return currItem.filter(item => item.code !== code)
        })
    }

    function increaseCartQuantity(itemP, quantity){
        setTotalItem(currItem => {
            if(currItem.find(item => item.itemP === itemP) == null){
                return [...currItem, {itemP,quantity}]
            } else {
                return  currItem.map(item => {
                    if(item.itemP === itemP) {
                        return {...item,quantity: item.quantity + quantity}
                    } else {
                        return item;
                    }
                })
            }
        })



    }

    function decreaseCartQuantity(itemP, quantity){
        setTotalItem(currItem => {
            if(currItem.find(item => item.itemP.code === itemP.code)?.quantity === 1){
                return  currItem.filter(item => item.itemP.code !== itemP.code)
            } else {
                return  currItem.map(item => {
                    if(item.itemP.code === itemP.code) {
                        return {...item, quantity: item.quantity - quantity}
                    } else {
                        return item;
                    }
                })
            }
        })
    }



    return(
        <ShoppingCartContext.Provider
            value={{
                GetItemQuantity,
                removeFromCart,
                increaseCartQuantity,
                decreaseCartQuantity,
                cartQuantity,
                categoryArray,
                totalItems,
                items,
                setItems,
                OpenCart,
                CloseCart
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
