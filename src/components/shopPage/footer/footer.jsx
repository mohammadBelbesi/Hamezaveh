import React from 'react';
import './footer.css'
import { Link } from 'react-router-dom';

export const Footer = ({getPrice}) => {

    return (<>
    
        <div className='footer'>
            <h1 className='footer-total'> סכום לתשלום: <span className='money'>₪</span><span className="priceMoney">{getPrice.toFixed(2)}</span> </h1>
            <Link to={"/cart"}>
            <button className="btn-footer">לסיום</button>
            </Link>
        </div>
    
    </>)

}