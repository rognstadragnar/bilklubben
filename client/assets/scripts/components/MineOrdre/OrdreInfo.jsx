import React from 'react';

export default class OrdreInfo extends Component {
    constructor(){
        super()
    }
    ComponentDidMount(){
        /*Axios.get('/api/getOrdreInfo')
        .then((res) => {
            this.setState({
                order: res.data.orderInfo 
            })
        })*/
    }
    render() {
        return (
            <div>
                OrdreInfo

                <div> <span>Info om bilen</span>
                    <ul>
                        <li>
                            
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

