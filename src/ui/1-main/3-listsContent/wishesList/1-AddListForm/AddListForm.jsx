import React, {useState} from "react"
import AddForm from "../../../../0-common/AddForm"
import {useDispatch} from "react-redux"
import styles from './AddListForm.module.css'
import {Alert} from "antd"
import {validateItem} from "../../../../0-common/validateForm"
import {addTask} from "../../../../../bll/lists/Lists-thunks"

const AddListForm = (props) => {
    const [errorMessage, setError] = useState(null)
    const [taskTitle, changeTaskTitle] = useState('')

    const dispatch = useDispatch()

    const addFormCallbacks = {
        addItem: () => {
            if (validateItem(taskTitle)) {
                setError(validateItem(taskTitle))
            } else {
                const newTask = {
                    title: taskTitle,
                    priority: 2,
                };
                dispatch(addTask(newTask, props.listId));
                changeTaskTitle('')
            }
        },
        onChangeItemName: (e) => {
            setError(null)
            changeTaskTitle(e.currentTarget.value)
        }
    }

    const onClose = () => {
        setError(null)
    }

    return (
        <>
            {errorMessage && <Alert
                message={null}
                className={styles.alertMessage}
                description={errorMessage}
                type="warning"
                closable
                onClose={onClose}
                showIcon
            />
            }
            <div className={styles.listHeader}>
                <AddForm item={'task'} itemName={taskTitle} {...addFormCallbacks} />
            </div>
        </>
    )
}

export default AddListForm
