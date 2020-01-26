import React from "react";
import AddFormContainer from "./addListsForm/AddListsFormContainer"
import {PageHeader} from "antd"

const HeaderPage = () => {

    const stylesAnt = {
        borderBottom: 'white 1px solid',
        padding: '24px',
        background: '#fafafa',
        fontColor: 'white'
    }

    const config = {
        extra: [<AddFormContainer/>]
    }

    return (
        <>
            <PageHeader style={stylesAnt}
                        title={'My wish lists'}
                        subTitle={'What are you wanna from Santa?'}
                        {...config}/>
        </>
    )
}

export default HeaderPage
