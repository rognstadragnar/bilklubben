import Axios from 'axios';

export default class EnOrdre extends React.Component {
    constructor(){
        super()
        this.state = {
            showing: false
        }
        this.handleShowClick = this.handleShowClick.bind(this)
        this.handleStausClick = this.handleStatusClick.bind(this)
    }
    handleShowClick(){
        let shouldShow;
        this.state.show ? shouldShow = false : shouldShow = true;
        this.setState({showing: shouldShow})
    }
    render(){
        
        
        return (
            <div onClick={this.handleShowClick}>
                <span>{this.props.id}: {this.props.bilNavn}</span>
                <div className='ordre-more-info'>
                    <span>Ordreinfo</span>
                    <p>{this.props.startDato} - {this.props.sluttDato}</p>
                    <p>Kostnad: {this.props.kostnad} poeng</p>
                    <span onClick={() => this.props.handleStatusClick(this.props.id)}>Mer info</span>
                </div>
            </div>  
        )
    }
}
