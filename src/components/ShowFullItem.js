import React, {Component} from 'react';

export class ShowFullItem extends Component { //вывод товара;
    render() {
        return (
            <div className='full-item'>
                <div>
                    <img src={this.props.item.img} width={250} height={250} alt="id" onClick={() => this.props.onShowItem(this.props.item)}/>
                    <h2>{this.props.item.title}</h2>
                    <b>{this.props.item.desc}</b>
                    <p>{this.props.item.price}₽</p>
                    <div className='add-to-card' onClick={() => this.props.onAdd(this.props.item)}>+</div>
                </div>
            </div>
        )
    } // показываем товар;
}

export default ShowFullItem;