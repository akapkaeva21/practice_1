import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
    /*const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');*/
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    async function handleLogin(event){
        event.preventDefault();

        // Проверка на пустые поля
        if (Object.values(formData).some(value => value === '')) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        try{
            await axios.post("http://localhost:8082/api/v1/login", {
                name: formData.name,
                password: formData.password,
            }).then(res => {
                console.log('Data sent successfully:', JSON.stringify(formData));
                console.log(res.data);

                if (res.data.status === false) {
                    console.log(res.message);
                    alert(res.data.message);
                } else if (res.data.status === true) {
                    console.log(res.message);
                    navigate('/home');
                    alert("Welcome to PluM, " + formData.name)
                }

            }, fail => {
                console.log(fail);
                //console.error('Error sending data:', error);
            });
        }
        catch(error){
            console.log(error);
            alert(error);
        }

    }

    /*const handleLogin = () => {
        // Проверка на пустые поля
        if (Object.values(formData).some(value => value === '')) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        fetch('http://localhost:8082/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                //console.log('Data sent successfully:', JSON.stringify(data));
                console.log('Data sent successfully:', JSON.stringify(formData));
                navigate('/home')
                alert("Welcome to PluM, " +formData.name)
                //Добавить чтобы начинало отображаться имя пользователя
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    };*/

    //const navigate = useNavigate();
    const handleRegister = () => {
        navigate('/reg');
    }

    return (
        <div>
            <h2>Авторизация пользователя</h2>
            <h1>Имя: <input type="text" name="name" value={formData.name} onChange={handleInputChange}/></h1>
            <h1>Пароль: <input type="password" name="password" value={formData.password} onChange={handleInputChange}/></h1>
            <h1>
                <button onClick={handleLogin}>Войти</button>
            </h1>
            <h1>
                <button onClick={handleRegister}>Зарегистрироваться</button>
            </h1>
        </div>
    );
};

export default Login;