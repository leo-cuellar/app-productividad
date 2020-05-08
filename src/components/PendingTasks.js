import React from 'react'
import TaskInput from './TaskInput'
import Task from './Task'
import Reorder from 'react-reorder';

const PendingTasks = ({
    newTask,
    handleNewTask,
    addTask,
    tasks,
    markComplete,
    toggleDetails,
    reorderList,
    filter,
    newFilter
}) => {

    const onReorder = (event, previousIndex, nextIndex, fromId, toId) => {
        reorderList(previousIndex, nextIndex)
    }

    return (
        <div className='contentContainer'>

            <TaskInput
                newTask={newTask}
                handleNewTask={handleNewTask}
                addTask={addTask}
                newFilter={newFilter}
            />

            <div className='tasks' id='scroll'>
                <Reorder
                    reorderId="taskList"
                    onReorder={onReorder}
                    component="ul"
                    lock="horizontal"
                    holdTime={500}
                    touchHoldTime={500}
                    mouseHoldTime={200}
                    disableContextMenus={true}
                    placeholder={
                        <div className="custom-placeholder" />
                    }
                >
                    {
                        filter === '1'
                            ?
                            tasks.filter(task => {
                                if (task.duration.hours === 0 && task.duration.minutes <= 30) {
                                    return task
                                }
                            }).map(task => (
                                <li key={task.id}><Task
                                    id={task.id}
                                    title={task.title}
                                    markComplete={markComplete}
                                    completed={false}
                                    toggleDetails={toggleDetails}
                                    hours={task.duration.hours}
                                    minutes={task.duration.minutes}
                                /></li>
                            ))
                            :
                            filter === '2'
                            ?
                            tasks.filter(task => {
                                if ((task.duration.minutes >= 30 && task.duration.hours === 0) || (task.duration.hours === 1 && task.duration.minutes === 0)) {
                                    return task
                                }
                            }).map(task => (
                                <li key={task.id}><Task
                                    id={task.id}
                                    title={task.title}
                                    markComplete={markComplete}
                                    completed={false}
                                    toggleDetails={toggleDetails}
                                    hours={task.duration.hours}
                                    minutes={task.duration.minutes}
                                /></li>
                            ))
                            :
                            filter === '3'
                            ?
                            tasks.filter(task => {
                                if (task.duration.minutes >= 0 && task.duration.hours >= 1) {
                                    return task
                                }
                            }).map(task => (
                                <li key={task.id}><Task
                                    id={task.id}
                                    title={task.title}
                                    markComplete={markComplete}
                                    completed={false}
                                    toggleDetails={toggleDetails}
                                    hours={task.duration.hours}
                                    minutes={task.duration.minutes}
                                /></li>
                            ))
                            :
                            tasks.map(task =>
                                (<li key={task.id}><Task
                                    id={task.id}
                                    title={task.title}
                                    markComplete={markComplete}
                                    completed={false}
                                    toggleDetails={toggleDetails}
                                    hours={task.duration.hours}
                                    minutes={task.duration.minutes}
                                /></li>
                            ))
                    }
                </Reorder>

            </div>

        </div>
    )

}

export default PendingTasks