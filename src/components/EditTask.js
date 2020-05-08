import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons'

const EditTask = ({
    details,
    markComplete,
    newTask,
    handleNewTask,
    newDescription,
    handleNewDescription,
    newHour,
    handleNewHour,
    newMinute,
    handleNewMinute,
    save,
    toggleTimer,
    remove
}) => {

    return (
        <div className='contentContainer'>
            <form className='editionContainer'>
                <div className='inputHeader'>
                    <input className='editInput title' value={newTask} onChange={handleNewTask} />
                    <div className='inputButtons'>
                        <button onClick={() => remove(details[0].id)}><FontAwesomeIcon icon={faTimes} /></button>
                        <button id='saveButton' onClick={() => save(details[0].id)}><FontAwesomeIcon icon={faSave} /></button>
                    </div>
                </div>
                <label className='inputLabel'>Descripción</label>
                <textarea className='editInput description' value={newDescription} onChange={handleNewDescription} />
                <label className='inputLabel'>Duración</label>
                <div className='timeInput'>
                    <div>
                        <label className='inputLabel'>Horas</label>
                        <input className='editInput time hour' value={newHour} onChange={handleNewHour} />
                    </div>
                    <div>
                        <label className='inputLabel'>Minutos</label>
                        <input className='editInput time minute' value={newMinute} onChange={handleNewMinute} />
                    </div>
                </div>
                <div className='inputFooter'>
                    <button onClick={() => markComplete(details[0].id)}>Completada</button>
                    <button id='timeButton' onClick={() => toggleTimer(details[0].id)}>Iniciar temporizador</button>
                </div>
            </form>
        </div>
    )
}

export default EditTask