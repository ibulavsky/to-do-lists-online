import React, {useEffect, useState} from "react"
import {Checkbox, Icon, Popconfirm, Select} from 'antd'
import styles from './Task.module.css'
import {useDispatch} from "react-redux"
import {deleteTask, updateTask} from "../../../../../bll/ListsReducer"
import InputForm from "../../../../0-common/InputForm"

const Task = ({taskItem, listId}) => {

    const [isChangeModeShow, setChangeModeShow] = useState(false)
    const [taskTitle, changeTaskTitle] = useState(taskItem.title)
    const {Option} = Select;

    const text = 'Are you sure to delete this wish?'

    useEffect(() => {
        changeTaskTitle(taskItem.title)
    }, [taskItem.title])

//redux
    const dispatch = useDispatch();

    const onPriorityChange = (value) => {
        dispatch(updateTask(listId, taskItem.id, {priority: value}))
        console.log(`priority selected ${value} - id ${taskItem.id}`);
    }
    const onUpdateTask = (taskTitle) => {
        dispatch(updateTask(listId, taskItem.id, {title: taskTitle}))
        setChangeModeShow(false)
    }
    const onDeleteTask = () => dispatch(deleteTask(listId, taskItem.id))
    const onChangeTaskStatus = (e) => {
        dispatch(updateTask(listId, taskItem.id, {status: (e.target.checked)}))
    }

    return (
        <>
            <span className={styles.listContainer}>
                               {isChangeModeShow ? <>
                                       <InputForm itemTitle={taskTitle} changeItemTitle={changeTaskTitle}
                                                  addItem={onUpdateTask}
                                                  undo={() => setChangeModeShow(false)}/>
                                   </>
                                   : <>
                                       <Checkbox className={styles.check} checked={taskItem.status}
                                                 onChange={(e) => onChangeTaskStatus(e)}> </Checkbox>
                                       <article className={styles.text}>
                                           {taskItem.title}
                                       </article>
                                       <Select defaultValue={taskItem.priority} style={{width: 120}}
                                               className={styles.priority}
                                               onChange={(value) => onPriorityChange(value)}>
                                           <Option value={3}>High</Option>
                                           <Option value={2}>Medium</Option>
                                           <Option value={1}>Low</Option>
                                       </Select>
                                       <Icon type="edit" className={styles.icon}
                                             onClick={() => setChangeModeShow(true)}/>
                                       <Popconfirm placement="right" title={text} onConfirm={onDeleteTask} okText="Yes"
                                                   cancelText="No">
                                           <Icon type="delete" className={styles.icon}/>
                                       </Popconfirm>
                                   </>
                               }
                </span>
        </>
    )
}

export default Task
