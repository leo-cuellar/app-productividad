import React from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../constants/routes'

const Nav = () => {

    return (
        <div className='nav'>
            <div className='navElement'>
                
                    <Link to={ROUTES.TASKS}>Pendientes</Link>
               
            </div>
            <div className='navElement'>
            
                    <Link to={ROUTES.COMPLETED}>Completadas</Link>
             
            </div>
            <div className='navElement'>
            
                    <Link to={ROUTES.GRAPH}>Grafica</Link>
        
            </div>
        </div>
    )

}

export default Nav