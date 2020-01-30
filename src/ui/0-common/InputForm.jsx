import {Alert, Icon, Input} from "antd"
import React, {useState} from "react"
import {validateItem} from "./validateForm"
import styles from "../1-main/3-listsContent/wishesList/listWrapper.module.css"

const InputForm = ({itemTitle, changeItemTitle, addItem, undo}) => {

    const [errorMessage, setError] = useState(null)

    const onAddItem = () => {
        if (validateItem(itemTitle)) {
            setError(validateItem(itemTitle))
        } else {
            addItem(itemTitle)
        }
    }

    const onClose = () => {
        setError(null)
    }

    const onUndo = () => {
        setError(null)
        undo()
    }

    return (
        <>
            <span className={styles.inputContainer}>
            {errorMessage &&
            <Alert
                message={null}
                style={{width: '100%', marginBottom: '8px', color: '#000'}}
                description={errorMessage}
                type="warning"
                closable
                onClose={onClose}
                showIcon
            />
            }
                <Input placeholder="List name" value={itemTitle}
                       autoFocus
                       onChange={(e) => {
                           setError(null)
                           changeItemTitle(e.currentTarget.value)
                       }}
                       onPressEnter={onAddItem}
                />
            </span>
            <Icon type="check-circle" className={styles.icon} onClick={onAddItem}/>
            <Icon type="undo" className={styles.icon} onClick={onUndo}/>
        </>
    )
}

export default InputForm
