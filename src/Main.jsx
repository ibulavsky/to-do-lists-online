import React from "react";
import HeaderPage from "./ui/header/HeaderPage"
import {Layout} from "antd"
import WishesListsContainer from "./ui/listsContent/WishesListsContainer"

const Main = () => {
    return (
        <>
            <Layout style={{background: '#fafafa', minHeight: '100vh'}}>
                <HeaderPage/>
                <WishesListsContainer/>
            </Layout>
        </>
    )
}

export default Main
