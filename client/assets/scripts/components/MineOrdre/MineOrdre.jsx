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
        console.log('hi')
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
                bilId={o.id}
                bilNavn= {o.bilMerke + '-' + o.bilModell} 
                startDato={new Moment(o.startDato).format('DD/MM/YYYY')} 
                sluttDato={new Moment(o.sluttDato).format('DD/MM/YYYY')} 
                ordreDato={new Moment(o.ordreDato).format('DD/MM/YYYY')}
                kostndad={o.kostnad} 
            />
        }) : <span className='no-orders'>Ingen ordre</span>;
        //const showStatusRapport = this.showStatusRapport ? <StatusRapport handleClick={this.handleCloseStatusClick} id={showStatusRapportId}/> : ''
        return (
            <div className='profil-ordre'>
                <h4>Mine ordre</h4>
                {ordreToShow}
            </div>  
        )
    }
}

