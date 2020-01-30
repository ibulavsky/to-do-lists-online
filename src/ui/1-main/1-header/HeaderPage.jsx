import React from "react";
import AddFormContainer from "./addListsForm/AddListsFormContainer"
import {Avatar, Button, PageHeader} from "antd"
import styles from './Header.module.css'

const HeaderPage = ({isAuth, loading, username}) => {

    const stylesAnt = {
        borderBottom: 'white 1px solid',
        padding: '24px 24px 4px 24px',
        background: '#fafafa',
    }

    let config;
    if (isAuth) {
        config = {
            extra: [
                <AddFormContainer/>
            ]
        }
    } else {
        config = {
            extra: [null]
        }
    }

    return (<>
            <PageHeader style={stylesAnt}
                        title={'My wish lists'}
                        subTitle={'What are you wanna from Santa?'}
                        {...config}>
                {isAuth
                    ? <figure className={styles.avatar}>
                        <Avatar size={30} icon="user"/>
                        <figurecaption className={styles.caption}>{username}</figurecaption>
                        <Button
                            className={styles.button}
                            type="primary"
                            icon="user"
                            loading={loading}
                            onClick={() => {}}>
                            Log out
                        </Button>
                    </figure>
                    : <>

                    </>
                }
            </PageHeader>
        </>
    )
}

export default HeaderPage
