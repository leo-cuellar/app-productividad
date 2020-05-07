import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import nextId from 'react-id-generator'
import { reorder, reorderImmutable, reorderFromTo, reorderFromToImmutable } from 'react-reorder';

import Nav from './components/Nav'
import PendingTasks from './components/PendingTasks';
import CompletedTasks from './components/CompletedTasks';
import EditTask from './components/EditTask';
import Timer from './components/Timer';
import Graph from './components/Graph'

import * as ROUTES from './constants/routes'

import './style/index.css'

const App = () => {

  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newHour, setNewHour] = useState('')
  const [newMinute, setNewMinute] = useState('')
  const [details, setDetails] = useState({
    display: false,
    id: '',
    title: '',
    description: '',
    duration: {
      hours: 0,
      minutes: 0,
    },
    completed: false
  })
  const [timer, setTimer] = useState({
    display: false,
    title: '',
    hours: 0,
    minutes: 0
  })
  const [graphData, setGraphData] = useState([
    { firstDayOfWeek: 0 },
    [
      { daysOfWeek: 1, completedTasks: 0 },
      { daysOfWeek: 2, completedTasks: 0 },
      { daysOfWeek: 3, completedTasks: 0 },
      { daysOfWeek: 4, completedTasks: 0 },
      { daysOfWeek: 5, completedTasks: 0 },
      { daysOfWeek: 6, completedTasks: 0 },
      { daysOfWeek: 7, completedTasks: 0 },
    ]
  ])

  useEffect(() => {

    let d = new Date()
    let firstDayOfWeek = getMonday()

    if (d.getDay() - firstDayOfWeek > 6) {
      setGraphData([
        graphData[0],
        [
          { daysOfWeek: 1, completedTasks: 0 },
          { daysOfWeek: 2, completedTasks: 0 },
          { daysOfWeek: 3, completedTasks: 0 },
          { daysOfWeek: 4, completedTasks: 0 },
          { daysOfWeek: 5, completedTasks: 0 },
          { daysOfWeek: 6, completedTasks: 0 },
          { daysOfWeek: 7, completedTasks: 0 },
        ]
      ])
    }

    setGraphData([
      { firstDayOfWeek: firstDayOfWeek },
      graphData[1]
    ])
    
  }, [])

  const getMonday = () => {
    let d = new Date()
    let day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return diff;
  }

  const handleNewTask = event => {
    setNewTask(event.target.value)
  }

  const handleNewDescription = event => {
    setNewDescription(event.target.value)
  }

  const handleNewHour = event => {
    setNewHour(Number(event.target.value))
  }

  const handleNewMinute = event => {
    setNewMinute(Number(event.target.value))
  }

  const addTask = event => {

    event.preventDefault()

    const taskObject = {
      id: nextId(),
      title: newTask,
      description: '',
      duration: {
        hours: 0,
        minutes: 30,
      },
      completed: false
    }

    setTasks(tasks.concat(taskObject))
    setNewTask('')

  }

  const markComplete = (id) => {

    if (details.display) {
      toggleDetails(id)
    }

    const newTasks = tasks.map(task => {
      if (task.id === id) {
        task.completed = !task.completed
      }
      return task
    })

    updateGraphData()

    setTasks(newTasks)

  }

  const toggleDetails = (id) => {

    const currentTask = tasks.filter(task => task.id === id)

    if (!details.display) {
      setDetails({
        display: !details.display,
        ...currentTask
      })
      setNewTask(currentTask[0].title)
      setNewDescription(currentTask[0].description)
      setNewHour(currentTask[0].duration.hours)
      setNewMinute(currentTask[0].duration.minutes)
    } else {
      setDetails({
        display: !details.display,
        id: '',
        title: '',
        description: '',
        duration: {
          hours: 0,
          minutes: 0,
        },
      })
      setNewTask('')
      setNewDescription('')
      setNewHour('')
      setNewMinute('')
    }

  }

  const save = (id) => {

    const newTasks = tasks.map(task => {
      if (task.id === id) {
        task.title = newTask
        task.description = newDescription
        task.duration.hours = newHour
        task.duration.minutes = newMinute
      }
      return task
    })

    setTasks(newTasks)
    toggleDetails(id)
  }

  const remove = (id) => {

    const newTasks = tasks.map(task => {
      if (task.id !== id) {
        return task
      }
    })

    setTasks(newTasks)

  }

  const reorderList = (previousIndex, nextIndex) => {

    setTasks(reorder(tasks, previousIndex, nextIndex))

  }

  const toggleTimer = (id) => {

    const currentTask = tasks.filter(task => task.id === id)
    const title = currentTask[0].title
    const hours = currentTask[0].duration.hours
    const minutes = currentTask[0].duration.minutes

    console.log(currentTask)

    if (!timer.display) {
      toggleDetails(id)
      setTimer({
        display: !timer.display,
        id: id,
        title: title,
        hours: hours,
        minutes: minutes
      })
    } else {
      setTimer({
        display: !timer.display,
        id: '',
        title: '',
        hours: 0,
        minutes: 0,
      })
    }

  }

  const updateGraphData = () => {

    let d = new Date()
    let dayOfWeek = 1

    switch (d.getDay()) {
      case 1:
        dayOfWeek = 1
        break
      case 2:
        dayOfWeek = 2
        break
      case 3:
        dayOfWeek = 3
        break
      case 4:
        dayOfWeek = 4
        break
      case 5:
        dayOfWeek = 5
        break
      case 6:
        dayOfWeek = 6
        break
      case 0:
        dayOfWeek = 7
        break
    }

    const newGraphData = [
      { firstDayOfWeek: graphData[0].firstDayOfWeek },
      graphData[1].map(data => {
        if (data.daysOfWeek === dayOfWeek) {
          data.completedTasks = data.completedTasks + 1
        }
        return data
      })
    ]

    setGraphData(newGraphData)

  }


  return (
    <>
      <Router>
        <Nav />
        <Redirect to={ROUTES.TASKS} />
        <Route
          path={ROUTES.TASKS}
          render={() => {
            if (timer.display) {
              return (
                <Timer
                  timer={timer}
                  toggleTimer={toggleTimer}
                  markComplete={markComplete}
                />
              )
            } else if (details.display) {
              return (
                <EditTask
                  newTask={newTask}
                  newDescription={newDescription}
                  newHour={newHour}
                  newMinute={newMinute}
                  handleNewTask={handleNewTask}
                  handleNewDescription={handleNewDescription}
                  handleNewHour={handleNewHour}
                  handleNewMinute={handleNewMinute}
                  details={details}
                  markComplete={markComplete}
                  toggleDetails={toggleDetails}
                  save={save}
                  remove={remove}
                  toggleTimer={toggleTimer}
                />
              )
            } else {
              return (
                <PendingTasks
                  newTask={newTask}
                  handleNewTask={handleNewTask}
                  addTask={addTask}
                  tasks={tasks.filter(task => !task.completed)}
                  markComplete={markComplete}
                  toggleDetails={toggleDetails}
                  reorderList={reorderList}
                />
              )
            }
          }}
        />
        <Route
          path={ROUTES.COMPLETED}
          render={() =>
            <CompletedTasks
              tasks={tasks.filter(task => task.completed)}
              markComplete={markComplete}
            />
          }
        />
        <Route
          path={ROUTES.GRAPH}
          render={() =>
            <Graph
              graphData={graphData[1]}
            />
          }
        />
      </Router>
    </>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))

