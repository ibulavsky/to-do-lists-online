import React from "react";
import AddFormContainer from "./addListsForm/AddListsFormContainer"
import {Avatar, Button, PageHeader} from "antd"
import styles from './Header.module.css'
import {useDispatch} from "react-redux"
import {logout} from "../../../bll/auth/Auth-thunks"

const HeaderPage = ({isAuth, loading, email, isListsLimit}) => {

    const dispatch = useDispatch()

    const onLogOut = () => {
        dispatch(logout())
    }

    const stylesAnt = {
        borderBottom: 'white 1px solid',
        padding: '24px 24px 4px 24px',
        background: '#fafafa',
    }

    let config;
    if (isAuth && !isListsLimit) {
        config = {
            extra: [<AddFormContainer/>]
        }
    } else if (isListsLimit) {
        config = {
            extra: [<div> Max quantity Lists is equals 10. </div>]
        }
    } else {
        config = {
            extra: [null]
        }
    }

    return (<>
            <PageHeader style={stylesAnt}
                        title={'My to do lists'}
                        subTitle={'What are you wanna to do?'}
                        {...config}>
                {isAuth
                    ? <figure className={styles.avatar}>
                        <Avatar size={30} icon="user"/>
                        <figurecaption className={styles.caption}>{email}</figurecaption>
                        <Button
                            className={styles.button}
                            type="primary"
                            icon="user"
                            loading={loading}
                            onClick={onLogOut}>
                            Log out
                        </Button>
                    </figure>
                    : null}
            </PageHeader>
        </>
    )
}

export default HeaderPage
