import React from "react";
import HeaderPage from "./1-header/HeaderPage"
import {Icon, Layout} from "antd"
import ListsContainer from "./3-listsContent/ListsContainer"
import {useSelector} from "react-redux"
import LoginPage from "./2-log-in/LoginPage"

const Main = () => {

    const {isAuth, loading, username} = useSelector(store => store.auth)

    return (
        <>
            <Layout style={{background: '#fafafa', minHeight: '100vh'}}>
                <HeaderPage isAuth={isAuth} loading={loading} username={username}/>
                {loading ? <>
                        <Icon type="loading" style={{fontSize: '50px'}}/>
                    </>
                    : <>
                        {isAuth
                            ? <>
                                <ListsContainer/>
                            </>
                            : <>
                                <LoginPage/>
                            </>
                        }
                    </>
                }
            </Layout>
        </>
    )
}

export default Main
