import React from 'react';
import EnBil from './EnBil';
export default class BilVisning extends React.Component{
    constructor(){
        super()
    }
    render(){
        console.log(this.props.opptatteBiler)
        const biler = this.props.biler ? this.props.biler.map(
            b => {
                if (this.props.opptatteBiler && this.props.opptatteBiler.length) {
                    return this.props.opptatteBiler.indexOf(b.id) < 0 ? 
                    <EnBil isValgt={this.props.valgtBil === b.id ? true : false} isDisabled={false} handleClick={this.props.handleBilValg} key={b.id + new Date()} bil={b} /> 
                    : <EnBil isValgt={this.props.valgtBil === b.id ? true : false} isDisabled={true} handleClick={this.props.handleBilValg} key={b.id + new Date()} bil={b} /> 
                }
                 else {
                     return <EnBil isValgt={this.props.valgtBil === b.id ? true : false} isDisabled={false} handleClick={this.props.handleBilValg} key={b.id + new Date()} bil={b} />
                }

            })
             
        : null
        return (
            <div>{biler}<button>a</button></div>
        )
    }
}