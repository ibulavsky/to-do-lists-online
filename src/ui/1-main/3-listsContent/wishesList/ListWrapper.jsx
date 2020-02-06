import {Icon, List} from "antd"
import React, {useEffect, useState} from "react"
import Task from "./2-ListContent/Task"
import AddListForm from "./1-AddListForm/AddListForm"
import ListFooter from "./3-ListFooter/ListFooter"
import ListHeader from "./0-ListHeader/ListHeader"
import styles from './listWrapper.module.css'
import {useDispatch} from "react-redux"
import {deleteList, getTasks, updateList} from "../../../../bll/lists/Lists-thunks"

const ListWrapper = ({l, ...props}) => {

    const [isInputShow, setInputShow] = useState(false)
    const [filterValue, changeFilter] = useState("All")
    const isListContentLoading = l.taskLoading

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

    const onDeleteList = () => dispatch(deleteList(l.id))

    const onUpdateList = (itemTitle) => {
        console.log(l.id)
        dispatch(updateList(l.id, {title: itemTitle}))
        setInputShow(false)
    }

    return (
        <>
            <div className={styles.container}>
                {isListContentLoading ? <Icon type="loading" style={{fontSize: '30px', margin: '50px 0'}}/>
                    : <> <ListHeader isInputShow={isInputShow} setInputShow={setInputShow}
                                     onUpdateList={onUpdateList} onDeleteList={onDeleteList} l={l}/>
                        <List style={{background: '#d9d9d9'}}
                              header={<AddListForm listId={l.id}/>}
                              footer={<ListFooter filterValue={filterValue} changeFilter={onChangeFilter}/>}
                              bordered
                              dataSource={tasks}
                              renderItem={item => (
                                  <List.Item>
                                      <Task listId={l.id} taskItem={item}/>
                                  </List.Item>)}/>
                    </>
                }
            </div>
        </>
    )
}

export default ListWrapper
