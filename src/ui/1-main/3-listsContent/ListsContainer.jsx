import React, {useEffect} from "react"
import ListWrapper from "./wishesList/ListWrapper"
import {useDispatch, useSelector} from "react-redux"
import {getLists} from "../../../bll/lists/Lists-thunks"
import {Icon, Modal} from "antd"
import styles from './ListsContainer.module.css'
import {setErrorMessage, setListsLimitation} from "../../../bll/lists/ListsReducer"

const ListsContainer = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLists())
    }, [dispatch])


    const {isListsLoading, isListsLimit, errorMessage, lists} = useSelector((store) => store.lists)

    switch (lists.length) {
        case 10 : !isListsLimit && dispatch(setListsLimitation(true)); break
        case 9 :  isListsLimit && dispatch(setListsLimitation(false)); break
        default: break
    }

    const listsArr = lists.map((l) => {
        if (l) {
            return <ListWrapper key={l.id} l={l}/>
        }
        return null
    })

    if (errorMessage) {
        Modal.error({
            title: 'This is an error message',
            content: errorMessage,
        });
        dispatch(setErrorMessage(''))
    }

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
