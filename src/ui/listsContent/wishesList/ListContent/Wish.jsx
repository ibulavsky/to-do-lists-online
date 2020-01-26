import React, {useEffect, useState} from "react"
import {Alert, Button, Checkbox, Icon, Input, Popconfirm, Select} from 'antd'
import styles from './Wish.module.css'
import {useDispatch} from "react-redux"
import {deleteWish, updateWish} from "../../../../bll/ListsReducer"
import {validateItem} from "../../../common/validateForm"
import InputForm from "../../../common/InputForm"

const Wish = ({wishItem, listId}) => {

    const [isChangeModeShow, setChangeModeShow] = useState(false)
    const [wishTitle, changeWishTitle] = useState(wishItem.title)
    const {Option} = Select;

    const text = 'Are you sure to delete this wish?'

    useEffect(() => {
        changeWishTitle(wishItem.title)
    }, [wishItem.title])

//redux
    const dispatch = useDispatch();

    const onPriorityChange = (value) => {
        dispatch(updateWish(listId, wishItem.id, {priority: value}))
        console.log(`priority selected ${value} - id ${wishItem.id}`);
    }
    const onUpdateWish = (wishTitle) => {
        dispatch(updateWish(listId, wishItem.id, {title: wishTitle}))
        setChangeModeShow(false)
    }
    const onDeleteWish = () => dispatch(deleteWish(listId, wishItem.id))
    const onChangeWishStatus = (e) => {
        dispatch(updateWish(listId, wishItem.id, {status: (e.target.checked)}))
    }

    return (
        <>
            <span className={styles.listContainer}>
                               {isChangeModeShow ? <>
                                       <InputForm itemTitle={wishTitle} changeItemTitle={changeWishTitle}
                                                  addItem={onUpdateWish}
                                                  undo={() => setChangeModeShow(false)}/>
                                   </>
                                   : <>
                                       <Checkbox className={styles.check} checked={wishItem.status}
                                                 onChange={(e) => onChangeWishStatus(e)}> </Checkbox>
                                       <article className={styles.text}>
                                           {wishItem.title}
                                       </article>
                                       <Select defaultValue={wishItem.priority} style={{width: 120}}
                                               className={styles.priority}
                                               onChange={(value) => onPriorityChange(value)}>
                                           <Option value={3}>High</Option>
                                           <Option value={2}>Medium</Option>
                                           <Option value={1}>Low</Option>
                                       </Select>
                                       <Icon type="edit" className={styles.icon}
                                             onClick={() => setChangeModeShow(true)}/>
                                       <Popconfirm placement="right" title={text} onConfirm={onDeleteWish} okText="Yes"
                                                   cancelText="No">
                                           <Icon type="delete" className={styles.icon}/>
                                       </Popconfirm>
                                   </>
                               }
                </span>
        </>
    )
}

export default Wish
