import React from 'react'

const TaskInput = ({ newTask, handleNewTask, addTask }) => {

    return (
        <div className='taskInputContainer'>
            <form onSubmit={addTask}>
                <input value={newTask} onChange={handleNewTask} placeholder='Nueva tarea' className='taskInput' />
                <button type='submit' className='taskSubmit'>+</button>
            </form>
        </div>
    )

}

export default TaskInput