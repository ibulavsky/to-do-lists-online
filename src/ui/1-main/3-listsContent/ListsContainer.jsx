import React, {useEffect} from "react"
import ListWrapper from "./wishesList/ListWrapper"
import {useDispatch, useSelector} from "react-redux"
import {getLists} from "../../../bll/Lists-thunks"
import {Icon} from "antd"
import styles from './ListsContainer.module.css'

const ListsContainer = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLists())
    }, [])


    const {isListsLoading, lists} = useSelector((store) => store.lists)

    const listsArr = lists.map((l) => {
        if (l) {
            return <ListWrapper key={l.id} l={l}/>
        }
        return null
    })

    return (<>
            {isListsLoading
                ? <Icon type="loading" style={{fontSize: '50px'}}/>
                : <div className={styles.listsWrap}>
                    {listsArr}
                </div>
            }
        </>
    )
}

export default ListsContainer
