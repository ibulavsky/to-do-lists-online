import React, {useEffect} from "react";
import HeaderPage from "./1-header/HeaderPage"
import {Icon, Layout} from "antd"
import ListsContainer from "./3-listsContent/ListsContainer"
import {useDispatch, useSelector} from "react-redux"
import LoginPage from "./2-log-in/LoginPage"
import {getAuthUserData} from "../../bll/auth/Auth-thunks"

const Main = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAuthUserData())
    }, [])

    const {isAuth, loading, email, errorMessage} = useSelector(store => store.auth)

    return (
        <>
            <Layout style={{background: '#fafafa', minHeight: '100vh'}}>
                <HeaderPage isAuth={isAuth} loading={loading} email={email} />
                {loading ? <>
                        <Icon type="loading" style={{fontSize: '50px'}}/>
                    </>
                    : <>
                        {isAuth
                            ? <>
                                <ListsContainer/>
                            </>
                            : <>
                                <LoginPage errorMessage={errorMessage}/>
                            </>
                        }
                    </>
                }
            </Layout>
        </>
    )
}

export default Main
