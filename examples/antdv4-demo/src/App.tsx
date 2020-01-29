import * as ReactDOM from "react-dom";
import React from "react";
import {
    CheckOutlined,
    CopyOutlined,
    CloseOutlined,
    NotificationOutlined,
    SettingOutlined,
} from '@ant-design/icons';

import {Input} from 'antd'
import BasicLayout from "./layout/BaiscLayout";

const App:React.FunctionComponent = () => {
    return <div>
        <BasicLayout breadcrumbNameMap={{}}/>
    </div>
};


ReactDOM.render(<App/>, document.getElementById("app"));
