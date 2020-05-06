import React from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../constants/routes'

const Nav = () => {

    return (
        <div className='nav'>
            <div className='navElement'>
                <li>
                    <Link to={ROUTES.TASKS}>Tareas pendientes</Link>
                </li>
            </div>
            <div className='navElement'>
                <li>
                    <Link to={ROUTES.COMPLETED}>Tareas completadas</Link>
                </li>
            </div>
            <div className='navElement'>
                <li>
                    <Link to={ROUTES.GRAPH}>Grafica</Link>
                </li>
            </div>
        </div>
    )

}

export default Nav