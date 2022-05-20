import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterType = 'All' | 'Active' | 'Completed'

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'REACT', isDone: true},
        {id: v1(), title: 'REDUX', isDone: false},
        {id: v1(), title: 'CSS', isDone: true}
    ])

    function addTask(title: string) {
        let newTask = {id: v1(), title, isDone: true}
        setTasks([newTask, ...tasks])
    }

    function removeTask(id: string) {
        setTasks([...tasks.filter(el => el.id !== id)])
    }

    function changeTaskStatus(id: string, isDone: boolean) {
        setTasks([...tasks.map(el => el.id === id ? {...el, isDone} : el)])
    }

    function changeFilter(value: FilterType) {
        setFilter(value)
    }


    const [filter, setFilter] = useState<FilterType>('All')

    let taskForTodolist = tasks

    if (filter === 'Active') {
        taskForTodolist = tasks.filter(el => !el.isDone)
    }
    if (filter === 'Completed') {
        taskForTodolist = tasks.filter(el => el.isDone)
    }


    return (
        <div className='App'>
            <div className='header'>
                <h2>Todolist</h2>
            </div>
            <div className='main'>
                <Todolist
                    title={'Todolist'}
                    tasks={taskForTodolist}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus}
                    changeFilter={changeFilter}
                    filter={filter}
                />
            </div>
        </div>
    );
}

export default App;
