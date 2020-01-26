import {Button, Input} from "antd"
import React from "react"

const AddForm = ({itemName, item, onChangeItemName, addItem}) => {

    return (
        <>
            <Input value={itemName}
                   placeholder={`Write ${item} name here`}
                   onChange={onChangeItemName}
                   onPressEnter={addItem}
                   style={{width: '200px', marginRight: '20px'}}/>
            <Button key="1" style={{marginLeft: '8px'}} onClick={addItem}>Add {item}</Button>
        </>
    )
}

export default AddForm
