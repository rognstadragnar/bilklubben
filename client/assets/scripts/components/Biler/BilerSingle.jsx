import React from 'react';
import BilMap from './BilMap.jsx';

export default class BilerSingle extends React.Component {
    constructor(){
        super()
        this.goToBestill = this.goToBestill.bind(this)

    }
    componentWillMount(){
        this.setState({bilen: bilen});
    }
    goToBestill() {
        window.sessionStorage.setItem('bestillingsBil', this.state.bilen.id);
        window.location = '/bestilling';
    }
    render() {
        return (
            <div className='bil-single'>
                <div className='bil-single-hero' style={{backgroundImage: 'url(/assets/img/biler/' + this.state.bilen.id + '/' + this.state.bilen.imglg + ')'}}>
                    
                    <div className='bil-single-hero-text'>
                        <h4>
                            <span>{this.state.bilen.make}</span>
                            <span>{this.state.bilen.model}</span>
                        </h4>
                    </div>
                </div>
                <div className='bil-single-content'>
                    <p className='desc'>
                        En fin generisk beskrivelse av bilen, som trekker frem hvor fantastisk bilen er og hvorfor vedkommende må leie akkurat denne bilen.
                    </p>
                    <div className='table-wrapper'>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Biltype</td>
                                    <td>{this.state.bilen.category}</td>
                                </tr>
                                <tr>
                                    <td>Stand</td>
                                    <td>{this.state.bilen.status}</td>
                                </tr>
                                <tr>
                                    <td>Årsmodell</td>
                                    <td>{this.state.bilen.year}</td>
                                </tr>
                                <tr>
                                    <td>Seter</td>
                                    <td>{this.state.bilen.seats}</td>
                                </tr>
                                <tr>
                                    <td>Motor</td>
                                    <td>{this.state.bilen.motor}</td>
                                </tr>
                                <tr>
                                    <td>Kmstand</td>
                                    <td>{this.state.bilen.km}</td>
                                </tr>
                                <tr>
                                    <td>Hestekrefter</td>
                                    <td>{this.state.bilen.bhp}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button onClick={this.goToBestill}>Bestill</button>
                </div>
                <span className='map-header'>Bilens nåværende lokasjon:</span>
                <BilMap bilen={this.state.bilen} />
            </div>
        )
    }
}