import React from 'react'
import './index.scss'

const Button = ({ onClick, text }) => 
    <div className="button" onClick={onClick}>
        {text}
    </div>


export default Button