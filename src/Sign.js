import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const Sign = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleSubmit = () => {
        // Проверка на пустые поля
        if (Object.values(formData).some(value => value === '')) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        fetch('http://localhost:8082/api/v1/reg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Data sent successfully:', data);
                navigate('/');
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    };

    return (
        <div>
            <h1>Имя: <input type="text" name="name" value={formData.name} onChange={handleInputChange} /></h1>
            <h1>Email: <input type="email" name="email" value={formData.email} onChange={handleInputChange}/></h1>
            <h1>Телефон: <input type="text" name="phone" value={formData.phone} onChange={handleInputChange}/></h1>
            <h1>Пароль: <input type="password" name="password" value={formData.password} onChange={handleInputChange}/></h1>
            <h1>
                <button className='add-to-card' onClick={handleSubmit}>Зарегистрироваться</button>
            </h1>
        </div>
    );
};

export default Sign;
