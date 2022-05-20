import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType} from "./App";


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsTodolistType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (id: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeFilter: (value: FilterType) => void
    filter: FilterType
}

export const Todolist = (props: PropsTodolistType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const onChangeFilterHandler = (value: FilterType) => {
        props.changeFilter(value)
    }

    return (
        <div className='wrapper'>
            <div className='wrapperBox'>
                <h3>{props.title}</h3>
                <div className='errorMessage'>
                    <input value={title}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           className={error ? "error" : ""}
                    />
                    <button onClick={addTaskHandler}>+</button>
                    {error && <div className="error-message">{error}</div>}
                </div>

                <ul>
                    {props.tasks.map((el) => {
                        const removeTaskHandler = () => {
                            props.removeTask(el.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(el.id, e.currentTarget.checked)
                        }
                        return (
                            <li>
                                <input type={'checkbox'}
                                       checked={el.isDone}
                                       onChange={onChangeStatusHandler}/>
                                <span>{el.title}</span>
                                <button onClick={removeTaskHandler}>X
                                </button>
                            </li>
                        )
                    })}

                </ul>
                <div className='btnBox'>
                    <button className={props.filter === 'All' ? 'active-filter' : ''}
                            onClick={() => onChangeFilterHandler('All')}>All
                    </button>
                    <button className={props.filter === 'Active' ? 'active-filter' : ''}
                            onClick={() => onChangeFilterHandler('Active')}>Active
                    </button>
                    <button className={props.filter === 'Completed' ? 'active-filter' : ''}
                            onClick={() => onChangeFilterHandler('Completed')}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
};

