import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faAngleRight } from '@fortawesome/free-solid-svg-icons'


const Task = ({ title, markComplete, id, completed, disabled, toggleDetails }) => {

    return (
        <div className='task'>
            <div className='taskInfo'>
                {disabled ?
                    <button disabled className={completed ? 'taskButtonComplete' : 'taskButtonComplete2'}><FontAwesomeIcon icon={faCheck} /></button>
                    :
                    <button onClick={() => markComplete(id)} className={completed ? 'taskButtonComplete' : 'taskButtonComplete2'}><FontAwesomeIcon icon={faCheck} /></button>
                }
                <p>{title}</p>
            </div>
            {disabled ?
                <button className='taskButtonDetailsDisabled' disabled><FontAwesomeIcon icon={faAngleRight} /></button>
                :
                <button className='taskButtonDetails' onClick={() => toggleDetails(id)}><FontAwesomeIcon icon={faAngleRight} /></button>
            }
        </div>
    )

}

export default Task