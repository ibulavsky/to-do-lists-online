import React, {useState} from "react"
import AddForm from "../../../0-common/AddForm"
import {useDispatch, useSelector} from "react-redux"
import {validateItem} from "../../../0-common/validateForm"
import {Alert} from "antd"
import {addList} from "../../../../bll/lists/Lists-thunks"

const AddListsFormContainer = () => {

    const [itemName, changeItemName] = useState('')
    const [errorMessage, setError] = useState(null)
    const {isListsLoading} = useSelector((state) => state.lists)
    const dispatch = useDispatch()

    const addFormCallbacks = {
        addItem: () => {
            if (validateItem(itemName)) {
                setError(validateItem(itemName))
            } else {
                const newWishList = {
                    title: itemName
                };
                dispatch(addList(newWishList))
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
                style={{width: '308px', margin: '8px'}}
                description={errorMessage}
                type="warning"
                closable
                onClose={onClose}
                showIcon
            />}
            <AddForm item={'list'} itemName={itemName} isLoading={isListsLoading} {...addFormCallbacks} />
        </>
    )
}

export default AddListsFormContainer
