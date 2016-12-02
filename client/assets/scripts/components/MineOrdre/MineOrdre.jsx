import React from 'react';
import Axios from 'axios';
import Moment from 'moment';

import EnOrdre from './EnOrdre.jsx';

export default class MineOrdre extends React.Component {
    constructor(){
        super()
        this.state = {
            ordre: []
        }
        this.handleStatusClick = this.handleStatusClick.bind(this)
        this.handleCloseStatusClick = this.handleCloseStatusClick.bind(this)
    }
    componentDidMount() {
        Axios.get('/api/getOrdre')
        .then((res)=> {
            this.setState({
                ordre: res.data.ordre
            })
        })
        .then(() => console.log(this.state))
    }
    handleStatusClick(val){
        this.setState({
            showStatusRapport: true,
            showStatusRapportId: val
        })
    }
    handleStatusClose(val){
        console.log(val)
        this.setState({
            showStatusRapport: true,
            showStatusRapportId: val
        })
    }
    handleCloseStatusClick(){
        this.setState({showStatusRapport: false})
    }
    render(){
        const ordreToShow = this.state.ordre.length ? this.state.ordre.map((o) => {
            return <EnOrdre 
                key={o.id}
                handleStatusClick={this.handleStatusClick}
                ordreId={o.id}
                bilNavn= {o.bilMerke + '-' + o.bilModell} 
                startDato={new Moment(o.startDato)} 
                sluttDato={new Moment(o.sluttDato)} 
                ordreDato={new Moment(o.ordreDato)}
                kostnad={o.kostnad} 
            />
        }) : null;
        //const showStatusRapport = this.showStatusRapport ? <StatusRapport handleClick={this.handleCloseStatusClick} id={showStatusRapportId}/> : ''
        return (
            <div className='profil-ordre'>
                <h4>Mine ordre</h4>

                <div className='ordre-table'>
                {this.state.ordre.length ? 
                    <table>
                        <tbody>
                            <tr>
                                <th>Dato</th>
                                <th>Ordreinfo</th>
                                <th>Pris (i BKp)</th>
                            </tr>
                                {ordreToShow}
                        </tbody>
                    </table>
                    : <span className='no-orders'>Ingen ordre</span>
                }
                </div>
            </div>  
        )
    }
}

