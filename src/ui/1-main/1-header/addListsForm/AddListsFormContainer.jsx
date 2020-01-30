import React, {useState} from "react"
import AddForm from "../../../0-common/AddForm"
import {useDispatch} from "react-redux"
import {addWishesList} from "../../../../bll/ListsReducer"
import {validateItem} from "../../../0-common/validateForm"
import {Alert} from "antd"

const AddListsFormContainer = () => {

    const [itemName, changeItemName] = useState('')
    const [errorMessage, setError] = useState(null)
    const dispatch = useDispatch()

    const addFormCallbacks = {
        addItem: () => {
            if (validateItem(itemName)) {
                setError(validateItem(itemName))
            } else {
                const newWishList = [{
                    name: itemName,
                    wishes: [],
                    id: +new Date()
                }]
                dispatch(addWishesList(...newWishList)
                )
                changeItemName('')
            }
        },
        onChangeItemName: (e) => {
            setError(null)
            changeItemName(e.currentTarget.value)
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
            />}
            <AddForm item={'list'} itemName={itemName} {...addFormCallbacks} />
        </>
    )
}

export default AddListsFormContainer
