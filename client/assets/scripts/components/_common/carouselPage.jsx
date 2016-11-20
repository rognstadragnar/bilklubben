import React from 'react';

export default ({children, classes = ''}) => {
    return (
        <div className={'carousel-page ' + classes}>{children}</div>
    )
}
