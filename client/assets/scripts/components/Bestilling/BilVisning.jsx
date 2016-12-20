import React from 'react';
import EnBil from './EnBil';
export default class BilVisning extends React.Component{
    constructor(){
        super()
    }
    render(){
        const biler = this.props.biler ? this.props.biler.map(
            b => {
                if (this.props.opptatteBiler && this.props.opptatteBiler.length) {
                    return this.props.opptatteBiler.indexOf(b.id) < 0 ? 
                    <EnBil handleVisInfo={this.props.handleVisInfo} isValgt={this.props.valgtBil === b.id ? true : false} isDisabled={false} handleClick={this.props.handleBilValg} key={b.id} bil={b} /> 
                    : <EnBil handleVisInfo={this.props.handleVisInfo} isValgt={this.props.valgtBil === b.id ? true : false} isDisabled={true} handleClick={this.props.handleBilValg} key={b.id} bil={b}  /> 
                }
                 else {
                     return <EnBil handleVisInfo={this.props.handleVisInfo} isValgt={this.props.valgtBil === b.id ? true : false} isDisabled={false} handleClick={this.props.handleBilValg} key={b.id} bil={b} />
                }

            })
             
        : null
        return (
            <div className='bil-visning'>{biler}</div>
        )
    }
}