import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const UserService = () => {
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
                } else if (res.data.status === true && res.data.message === "admin") {

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

export default UserService;




















/*import React, {Component} from 'react';
import axios from "axios";

export class UserService extends Component { //вывод товаров;
    constructor(props) {
        super(props)
        this.state ={
            users: []
        }
    }

    componentDidMount()
    {
        axios.get("http://localhost:8082/api/v1/users/all")
            .then(res =>
                this.setState({users: res.data});
            });

    }

    render() {

        const { users } = this.state;

        return (
            //Прописать, чтобы просто выводило список пользователей
            <div className='categories'>
                {this.state.categories.map(el => (
                    <div key={el.id} onClick={() => this.props.chooseCategory(el.id)}>{el.name}</div>
                ))}
            </div>
        )
    }
}

export default UserService;*/

// import axios from 'axios'
//
// const USERS_REST_API_URL = 'http://localhost:3000/users';
//
// class UserService {
//
//     getUsers(){
//         return axios.get(USERS_REST_API_URL);
//     }
// }