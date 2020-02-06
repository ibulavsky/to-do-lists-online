import React, {useEffect} from "react";
import HeaderPage from "./1-header/HeaderPage"
import {Icon, Layout,} from "antd"
import ListsContainer from "./3-listsContent/ListsContainer"
import {useDispatch, useSelector} from "react-redux"
import LoginPage from "./2-log-in/LoginPage"
import {getAuthUserData} from "../../bll/auth/Auth-thunks"

const Main = () => {

    const {Footer} = Layout;

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAuthUserData())
    }, [dispatch])

    const {isAuth, loading, email, errorMessage} = useSelector(store => store.auth)
    const {isLoading, isListsLimit} = useSelector(store => store.lists)

    return (
        <>
            <Layout style={{background: '#fafafa', minHeight: '100vh'}}>
                <HeaderPage isAuth={isAuth} loading={loading} email={email} isListsLimit={isListsLimit} isLoading={isLoading}/>
                {!loading && isAuth && <ListsContainer/>}
                {!loading && !isAuth && <LoginPage errorMessage={errorMessage}/>}
                {loading && <Icon type="loading" style={{fontSize: '50px'}}/>}
                <Footer style={{background: '#fafafa', marginTop: '10px'}}/>
            </Layout>
        </>
    )
}

export default Main
