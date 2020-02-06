import React, {useEffect, useState} from "react"
import styles from "../listWrapper.module.css"
import InputForm from "../../../../0-common/InputForm"
import {Icon, Popconfirm} from "antd"


const ListHeader = ({isInputShow, setInputShow, onUpdateList, onDeleteList, l}) => {


    const [listTitle, changeListTitle] = useState(l.title)

    useEffect(() => {
        changeListTitle(l.title)
    }, [l.title])

    const confirmText = 'Are you sure to delete this list?'

    return (
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

    )
}

export default ListHeader
