import React from 'react';

export default (props) => {
    let indicators = [];
    for (let i = 1; i <= props.totalPages; i++) {
        indicators.push(<div className={i == props.currentPage ? 'dot active' : 'dot' } key={Date.now() + i}></div>)
    }

    return (
        <div className={'carousel-parent showing' + props.currentPage}>
            {props.children}
            <div className='indicators'>
                {indicators}
            </div>
        </div>
    )
}
    