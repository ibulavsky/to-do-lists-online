import React, {useState} from "react"
import AddForm from "../../../../0-common/AddForm"
import {useDispatch} from "react-redux"
import {addWish} from "../../../../../bll/ListsReducer"
import styles from './listHeader.module.css'
import {Alert} from "antd"
import {validateItem} from "../../../../0-common/validateForm"

const ListHeader = (props) => {
    const [errorMessage, setError] = useState(null)
    const [wishName, changeWish] = useState('')

    const dispatch = useDispatch()

    const addFormCallbacks = {
        addItem: () => {
            if (validateItem(wishName)) {
                setError(validateItem(wishName))
            } else {
                const newWish = {
                    title: wishName,
                    priority: 2,
                    id: +new Date()
                };
                dispatch(addWish(newWish, props.listId));
                changeWish('')
            }
        },
        onChangeItemName: (e) => {
            setError(null)
            changeWish(e.currentTarget.value)
        }
    }

    const onClose = () => {
        setError(null)
    }

    return (
        <>
            {errorMessage && <Alert
                message={null}
                style={{width: '307px', margin: '8px 0 8px 8px'}}
                description={errorMessage}
                type="warning"
                closable
                onClose={onClose}
                showIcon
            />
            }
            <div className={styles.listHeader}>
                <AddForm item={'wish'} itemName={wishName} {...addFormCallbacks} />
            </div>
        </>
    )
}

export default ListHeader
