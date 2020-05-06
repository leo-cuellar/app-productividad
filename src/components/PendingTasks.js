import React from 'react'
import TaskInput from './TaskInput'
import Task from './Task'

const PendingTasks = ({
    newTask,
    handleNewTask,
    addTask,
    tasks,
    markComplete,
    toggleDetails
}) => {

    return (
        <div className='contentContainer'>

            <TaskInput
                newTask={newTask}
                handleNewTask={handleNewTask}
                addTask={addTask}
            />

            <div className='tasks' id='scroll'>
                {tasks.map(task => {
                    return <Task
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        markComplete={markComplete}
                        completed={false}
                        toggleDetails={toggleDetails}
                    />
                })}
            </div>

        </div>
    )

}

export default PendingTasks