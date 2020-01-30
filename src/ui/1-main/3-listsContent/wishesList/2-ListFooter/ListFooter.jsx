import React, {useState} from 'react';
import {Button, Icon, Typography} from "antd"
import styles from './listFooter.module.css'

const ListFooter = ({filterValue, changeFilter}) => {

    const [isHidden, hide] = useState(false)

    const onAllFilterClick = () => {
        changeFilter("All")
    }
    const onCompletedFilterClick = () => {
        changeFilter("Completed")
    }
    const onActiveFilterClick = () => {
        changeFilter("Active")
    }

    const onShowFiltersClick = () => {
        hide(true)
    }
    const onHideFiltersClick = () => {
        hide(false)
    }


    let typeForAll = filterValue === "All" ? "primary" : "";
    let typeForCompleted = filterValue === "Completed" ? "primary" : "";
    let typeForActive = filterValue === "Active" ? "primary" : "";

    return (
        <div className={styles.listFooter}>
            {!isHidden && <div>
                <Button key="11" onClick={onAllFilterClick} type={typeForAll}>ALL</Button>
                <Button key="12" onClick={onCompletedFilterClick} type={typeForCompleted}>Completed</Button>
                <Button key="13" onClick={onActiveFilterClick} type={typeForActive}>Active</Button>
            </div>
            }
            {!isHidden && <span onClick={onShowFiltersClick}>
                    <Icon type="backward"/>
                    <Typography code>hide</Typography>
                </span>}
            {isHidden && <span onClick={onHideFiltersClick}> <Icon type="forward"/>
                    <Typography code>show</Typography> </span>}
        </div>
    )
}

export default ListFooter
