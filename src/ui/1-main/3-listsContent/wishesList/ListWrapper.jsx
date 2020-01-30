import {Icon, List, Popconfirm} from "antd"
import React, {useEffect, useState} from "react"
import Wish from "./1-ListContent/Wish"
import ListHeader from "./0-ListHeader/ListHeader"
import ListFooter from "./2-ListFooter/ListFooter"
import styles from './listWrapper.module.css'
import {useDispatch} from "react-redux"
import {deleteWishesList, updateWishesList} from "../../../../bll/ListsReducer"
import InputForm from "../../../0-common/InputForm"

const ListWrapper = ({l, ...props}) => {
    const [isInputShow, setInputShow] = useState(false)
    const [listTitle, changeListTitle] = useState(l.name)
    const [filterValue, changeFilter] = useState("All")
    const [myWishes, changeWishes] = useState(l.wishes)

    const text = 'Are you sure to delete this list?'

    const onChangeFilter = (filter) => {
        changeFilter(filter)
    }

    const wishes = myWishes.filter(w => {
        switch (filterValue) {
            case "All":
                return true;
            case "Active":
                return !w.status;
            case "Completed":
                return w.status;
            default:
                return true
        }
    })

    const dispatch = useDispatch()
    // component did update
    useEffect(() => {
        changeWishes(l.wishes)
    }, [l.wishes])

    useEffect(() => {
        changeListTitle(l.name)
    }, [l.name])

    const deleteList = () => {
        dispatch(deleteWishesList(l.id))
    }

    const updateList = (itemTitle) => {
        dispatch(updateWishesList(l.id, {name: itemTitle}))
        setInputShow(false)
    }

    return (
        <>
            <div className={styles.container}>
                <header className={styles.titleWrap}>
                    {isInputShow ? <>
                            <InputForm itemTitle={listTitle} changeItemTitle={changeListTitle} addItem={updateList}
                                       undo={() => {
                                           setInputShow(false)
                                       }}/>
                        </>
                        : <>
                            <h3 className={styles.title} style={{}}>{`${l.name}`}</h3>
                            <Icon type="edit" className={styles.icon} onClick={() => setInputShow(true)}/>
                            <Popconfirm placement="right" title={text} onConfirm={deleteList} okText="Yes"
                                        cancelText="No">
                                <Icon type="delete" className={styles.icon}/>
                            </Popconfirm>

                        </>
                    }
                </header>
                <List
                    style={{background: '#d9d9d9'}}
                    header={<ListHeader listId={l.id}/>}
                    footer={<ListFooter filterValue={filterValue} changeFilter={onChangeFilter}/>}
                    bordered
                    dataSource={wishes}
                    renderItem={item => (
                        <List.Item>
                            <Wish listId={l.id} wishItem={item}/>
                        </List.Item>
                    )}
                />
            </div>
        </>
    )
}

export default ListWrapper
