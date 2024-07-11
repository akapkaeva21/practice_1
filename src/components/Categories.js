import React, {Component} from 'react';
import axios from "axios";

export class Categories extends Component { //вывод товаров;
    constructor(props) {
        super(props)
        this.state ={
            categories: []
        }
    }

    componentDidMount()
    {
        axios.get("http://localhost:8082/api/v1/categories")
            .then(response => {
                //this.setState({items : response.data});
                this.setState({categories : response.data});
            });
        
    }

    render() {

        const { categories } = this.state;

        return (
            <div className='categories'>
                {this.state.categories.map(el => (
                    <div key={el.id} onClick={() => this.props.chooseCategory(el.id)}>{el.name}</div>
                ))}
            </div>
        )
    }
}

export default Categories;