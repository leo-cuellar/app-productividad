import React from 'react'

const TaskInput = ({ newTask, handleNewTask, addTask, newFilter }) => {

    return (
        <div className='taskInputContainer'>
            <form onSubmit={addTask}>
                <input value={newTask} onChange={handleNewTask} placeholder='Nueva tarea' className='taskInput' />
                <button type='submit' className='taskSubmit'>+</button>
            </form>

            <div className='filterMenu'>
                <button className='filterButton' onClick={() => newFilter('all')}>TODAS</button>
                <button className='filterButton' onClick={() => newFilter('1')}>MENOS 30 MINS</button>
                <button className='filterButton' onClick={() => newFilter('2')}>30 MINS A 1 HORA</button>
                <button className='filterButton' onClick={() => newFilter('3')}>MÁS DE 1 HORA</button>
            </div>
        </div>
    )

}

export default TaskInput