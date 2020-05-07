import React from 'react'
import TaskInput from './TaskInput'
import Task from './Task'
import Reorder, {
    reorder,
    reorderImmutable,
    reorderFromTo,
    reorderFromToImmutable
} from 'react-reorder';

const PendingTasks = ({
    newTask,
    handleNewTask,
    addTask,
    tasks,
    markComplete,
    toggleDetails,
    reorderList
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
            />

            <div className='tasks' id='scroll'>
                <Reorder
                    reorderId="taskList" // Unique ID that is used internally to track this list (required)
                    onReorder={onReorder}
                    component="ul" // Tag name or Component to be used for the wrapping element (optional), defaults to 'div'
                    lock="horizontal" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
                    holdTime={500} // Default hold time before dragging begins (mouse & touch) (optional), defaults to 0
                    touchHoldTime={500} // Hold time before dragging begins on touch devices (optional), defaults to holdTime
                    mouseHoldTime={200} // Hold time before dragging begins with mouse (optional), defaults to holdTime
                    disableContextMenus={true} // Disable context menus when holding on touch devices (optional), defaults to true
                    placeholder={
                        <div className="custom-placeholder" /> // Custom placeholder element (optional), defaults to clone of dragged element
                    }
                >
                    {tasks.map(task =>
                        (<li key={task.id}><Task
                            id={task.id}
                            title={task.title}
                            markComplete={markComplete}
                            completed={false}
                            toggleDetails={toggleDetails}
                        /></li>
                        ))}
                </Reorder>
            </div>

        </div>
    )

}

export default PendingTasks