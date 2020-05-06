import React from 'react'
import Task from './Task'

const CompletedTasks = ({
    tasks,
    markComplete
}) => {

    return (
        <div className='contentContainer'>
            <div className='tasks' id='scroll'>
                {tasks.map(task => {
                    return <Task
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        markComplete={markComplete}
                        completed={true}
                        disabled={true}
                    />
                })}
            </div>

        </div>
    )

}

export default CompletedTasks