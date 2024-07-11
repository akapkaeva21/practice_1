import React, {useEffect, useState} from 'react';
import { FaShoppingCart } from "react-icons/fa";
import Order from "./Order";
import {useNavigate} from "react-router-dom";
import axios from "axios";


function handleCheckout() {

}

const ShowOrders = (props) => {
    // const [cart, setCart] = useState([]);
    //
    // // const handleOrderClick = (item) => {
    // //     // Логика добавления товара в корзину
    // //     setCart([...cart, item]);
    // // };
    //
    // useEffect(() => {
    //     console.log("Run something")
    // }, [])
    // const handleCheckout = () => {
    //     // Логика отправки данных корзины на бэкенд
    //     fetch("http://localhost:8082/api/v1/producter", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(cart),
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             // Логика обработки ответа от бэкенда
    //             console.log('Заказ успешно отправлен:', data);
    //             // Очистка корзины после успешного заказа
    //             setCart([]);
    //         })
    //         .catch(error => {
    //             // Логика обработки ошибок
    //             console.error('Ошибка при отправке заказа:', error);
    //         });
    // }

    // const handleCheckout = () => {
    //     // Отправка данных корзины на бэкенд
    //     const checkoutData = JSON.stringify(props.orders);
    //
    //     axios.post('http://localhost:8082/api/v1/products', checkoutData, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(response => {
    //             // Обработка ответа от сервера
    //         })
    //         .catch(error => {
    //             // Обработка ошибки
    //         });
    // };

    const handleCheckout = async () => {
        try {
            //let Sunny;
            const response = await axios.post('http://localhost:8082/api/v1/orders/doorder', {
                username: "alex",
                items: props.orders
            });
            console.log('Order placed successfully:', JSON.stringify(response.data));
            //console.log('Order placed successfully:', response.json());
            // Дополнительные действия, например, обновление состояния или редирект
        } catch (error) {
            console.error('Error placing order:', error);
            // Обработка ошибки
        }
    };


    let sum=0;
    props.orders.forEach(el => sum += Number.parseInt(el.price))
    return ( <div>
        {props.orders.map((el)=>(
            <Order onDelete={props.onDelete} key={el.id} item={el} />
        ))}
        <p className='sum'>Сумма заказа: {new Intl.NumberFormat().format(sum)}₽</p>
        <p><button type="submit" className='order' onClick={handleCheckout}>Заказ</button>
        </p>
    </div>)
}



const showNothing = () => {
    return (<div className = 'empty'>
    <h2> Товаров нет </h2>
    </div>)
}

// const ShoppingCart = () => {
//     const [cart, setCart] = useState([]);
//
//     const handleOrderClick = (item) => {
//         // Логика добавления товара в корзину
//         setCart([...cart, item]);
//     };
//
//     const handleCheckout = () => {
//         // Логика отправки данных корзины на бэкенд
//         fetch("http://localhost:8082/api/v1/products", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(cart),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 // Логика обработки ответа от бэкенда
//                 console.log('Заказ успешно отправлен:', data);
//                 // Очистка корзины после успешного заказа
//                 setCart([]);
//             })
//             .catch(error => {
//                 // Логика обработки ошибок
//                 console.error('Ошибка при отправке заказа:', error);
//             });
//     }
// }

export default function Header(props) {
    let [cardOpen, setCardOpen]=useState(false)
    const navigate = useNavigate();
    const navigateToContacts = () => {
        navigate('/contacts');
    };
    const navigateToLogin = () => {
        navigate('/');
    };
    return (
        <header>
            <div>
                <span className='logo'> PluM </span>
                <ul className='nav'>

                    <li>
                        <button onClick={navigateToContacts}>Контакты</button>
                    </li>
                    <li>
                        <button onClick={navigateToLogin}>Выйти</button>
                    </li>
                </ul>
                <FaShoppingCart onClick={() => setCardOpen(cardOpen = !cardOpen)} className={`shop-card-button ${cardOpen && 'active'}`}/>
                {cardOpen && (
                    <div className='shop-card'>
                        {props.orders.length+1>0  ?
                        ShowOrders(props): showNothing()
                        }
                        </div>
                )}
            </div>
            <div className='presentation'></div>
        </header>
    );
}

//export default ShoppingCart;
