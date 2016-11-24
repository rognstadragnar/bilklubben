import React from 'react';
import EnBil from './EnBil';
export default class BilVisning extends React.Component{
    render(){
        const biler = this.props.biler.map(b => <EnBil id={b.id} />)
        return (
            <div>{biler}</div>
        )
    }
}