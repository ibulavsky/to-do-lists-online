import {Icon, List, Popconfirm} from "antd"
import React, {useEffect, useState} from "react"
import Task from "./1-ListContent/Task"
import ListHeader from "./0-ListHeader/ListHeader"
import ListFooter from "./2-ListFooter/ListFooter"
import styles from './listWrapper.module.css'
import {useDispatch} from "react-redux"
import InputForm from "../../../0-common/InputForm"
import {deleteList, getTasks, updateList} from "../../../../bll/lists/Lists-thunks"

const ListWrapper = ({l, ...props}) => {

    const [isInputShow, setInputShow] = useState(false)
    const [listTitle, changeListTitle] = useState(l.title)
    const [filterValue, changeFilter] = useState("All")
    const confirmText = 'Are you sure to delete this list?'

    const onChangeFilter = (filter) => changeFilter(filter)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTasks(l.id))
    }, [dispatch, l.id])

    const tasks = l.tasks && l.tasks
        .filter(t => {
            switch (filterValue) {
                case "All":
                    return true;
                case "Active":
                    return !t.status;
                case "Completed":
                    return t.status;
                default:
                    return true
            }
        })

    // component did update
    useEffect(() => {
        // changeTask(l.tasks)
    }, [l.tasks])

    useEffect(() => {
        changeListTitle(l.title)
    }, [l.title])

    const onDeleteList = () => {
        dispatch(deleteList(l.id))
    }

    const onUpdateList = (itemTitle) => {
        console.log(l.id)
        dispatch(updateList(l.id, {title: itemTitle}))
        setInputShow(false)
    }

    return (
        <>
            <div className={styles.container}>
                <header className={styles.titleWrap}>
                    {isInputShow ? <>
                            <InputForm itemTitle={listTitle} changeItemTitle={changeListTitle} addItem={onUpdateList}
                                       undo={() => {
                                           setInputShow(false)
                                       }}/>
                        </>
                        : <>
                            <h3 className={styles.title} style={{}}>{`${l.title}`}</h3>
                            <Icon type="edit" className={styles.icon} onClick={() => setInputShow(true)}/>
                            <Popconfirm placement="right" title={confirmText} onConfirm={onDeleteList} okText="Yes"
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
                    dataSource={tasks}
                    renderItem={item => (
                        <List.Item>
                            <Task listId={l.id} taskItem={item}/>
                        </List.Item>
                    )}
                />
            </div>
        </>
    )
}

export default ListWrapper
