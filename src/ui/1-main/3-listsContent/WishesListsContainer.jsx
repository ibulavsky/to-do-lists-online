import React, {useEffect} from "react"
import ListWrapper from "./wishesList/ListWrapper"
import {useDispatch, useSelector} from "react-redux"
import {getLists} from "../../../bll/Lists-thunks"
import {Icon} from "antd"

const WishesListsContainer = () => {

    const dispatch = useDispatch()
    const {isListsLoading, wishesLists} = useSelector((store) => store.lists)

    useEffect(() => {
        dispatch(getLists())
    }, [])
    const listsArr = wishesLists.map((l) => {
        if (l) {
            return <ListWrapper key={l.id} l={l}/>
        }
        return null
    })

    return (<>
            {isListsLoading
                ? <Icon type="loading" style={{fontSize: '50px'}}/>
                : <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                    {listsArr}
                </div>
            }
        </>
    )
}

export default WishesListsContainer
