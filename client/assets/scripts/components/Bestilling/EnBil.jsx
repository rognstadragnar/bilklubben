import React from 'react';


export default class EnBil extends React.Component{
    render(){
        const classes = this.props.isDisabled ? ' disabled' : this.props.isValgt ? ' valgt' : '';
        let hover = false;
        return (
            <div onClick={()=>{}} className={'en-bil' + classes}>
                <div className='en-bil-img' style={{backgroundImage: 'url(/assets/img/biler/' + this.props.bil.id + '/' + this.props.bil.imgsm +')'}} />
                <div className='en-bil-desc'>
                    <span className='en-bil-desc-left'>
                        <span className='fat'>{this.props.bil.make}</span><span className='slim'>{this.props.bil.model}</span>
                    </span>
                    <span className='en-bil-desc-right'>{this.props.bil.price}bkp</span>
                </div>
                <div className='en-bil-overlay'>
                    <div className='en-bil-velg' onClick={(e) => {e.stopPropagation(); console.log(hover); this.props.isDisabled && hover ? null : this.props.handleClick(this.props.bil.id)}}></div>
                    <div className='en-bil-info' onClick={(e) => {e.stopPropagation(); console.log(hover); hover ? this.props.handleVisInfo(this.props.bil.id) : null}}></div>
                </div>
            </div>
        )
    }
}