import React from 'react';
import Axios from 'axios';

export default class MineOrdre extends React.Component {
    constructor(){
        super()
        this.handleStatusClick = this.handleStatusClick.bind(this)
        this.handleCloseStatusClick = this.handleCloseStatusClick.bind(this)
    }
    ComponentDidMount(){
        Axios.get('/api/ordrer')
        .then(()=> {
            this.setState({
                ordrer: res.data.ordrer
            })
        })
    }
    handleStatusClick(val){
        this.setState({
            showStatusRapport: true,
            showStatusRapportId: val
        })
    }
    handleCloseStatusClick(){
        this.setState({showStatusRapport: false})
    }
    render(){
        const ordreToShow = this.state.ordre.map((o) => {
            <EnOrdre  
                key={o.id}
                handleStatusClick={this.handleStatusClick}
                id={o.id}
                bilNavn={o.bilNavn} 
                startDato={o.startDato} 
                sluttDato={o.sluttDato} 
                kostndad={o.kostnad} 
            />
        })
        const showStatusRapport = this.showStatusRapport ? <StatusRapport handleClick={this.handleCloseStatusClick} id={showStatusRapportId}/> : ''
        return (
            <div>{ordreToSHow}
            </div>  
        )
    }
}

