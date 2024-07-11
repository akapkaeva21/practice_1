import React, { useEffect, useState, Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";
import {
    Route,
    Routes,
    BrowserRouter as Router,
} from "react-router-dom";
import PageNotFound from "./404Page";
import Contacts from "./components/Contacts";
import Sign from "./Sign";
import Login from "./Login";


// import Content from './components/Content';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            currentItems: [],
            items: [],
            loading: true,
            showFullItem: false,
            fullItem: {} //отображение товара;

        };

        //this.state.currentItems = this.state.items
        this.addToOrder = this.addToOrder.bind(this)
        this.deleteOrder = this.deleteOrder.bind(this)
        this.chooseCategory = this.chooseCategory.bind(this)
        this.onShowItem = this.onShowItem.bind(this)
        //this.refreshProducts=this.refreshProducts.bind(this)
    }

    componentDidMount()
    {
        axios.get("http://localhost:8082/api/v1/products")
            .then(response => {
                this.setState({items : response.data});
                this.setState({currentItems : response.data});
            });
        console.log("Products are got")
    }
    
    render() {
        const { currentItems } = this.state;

        return (
            <Router>
                <Routes>
                    <Route exact path="/home" element={<div className="wrapper">
                        <Header orders={this.state.orders} onDelete={this.deleteOrder}/>
                    <Categories chooseCategory={this.chooseCategory}/>
                    <Items onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.addToOrder}/>
                        {this.state.showFullItem &&
                                <ShowFullItem onAdd={this.addToOrder} onShowItem={this.onShowItem} item={this.state.fullItem}/>}
                    <Footer/> </div>}/>
                    <Route exact path="/contacts"
                           element={<div className="wrapper"> <Contacts/> </div>}/>
                    <Route exact path="/reg"
                           //element={<div className=""> <Sign/> </div>}/>
                           element={<div className='sign'> <Sign/> </div>}/>
                    <Route exact path="/"
                        //element={<div className=""> <Sign/> </div>}/>
                           element={<div className='sign'> <Login/> </div>}/>
                    <Route
                        path="*"
                        element={<div className="wrapper"><PageNotFound/></div>}/>
                </Routes>
            </Router>
        )
    }



    onShowItem(item) {
        this.setState({fullItem: item})
        this.setState({showFullItem: !this.state.showFullItem})
    }

    chooseCategory(category) {
        // if (category === 'all') {
        //     this.setState({currentItems: this.state.items})
        //     return
        // }
        this.setState({
            currentItems: this.state.items.filter(el => el.categories.some(elem => elem.id === category))
        })
        console.log(category)
        console.log(this.state.currentItems.length)
    }

    deleteOrder(id) {
        this.setState({orders: this.state.orders.filter(el => el.id !== id)})
        console.log(id)
    }

    addToOrder(item) {
        let isInArray = false
        this.state.orders.forEach(el => {
            if (el.id === item.id)
                isInArray = true
        })
        if(!isInArray) {
            this.state.orders.push(item);
            this.setState({orders: this.state.orders})
        }
        console.log(this.state.orders)
    }
}

export default App;




















//import {Route, Routes, BrowserRouter as Router,} from "react-router-dom";
// import Home from "./Home";
// import PageNotFound from "./404Page";









