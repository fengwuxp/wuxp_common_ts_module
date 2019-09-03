import BasicLayout from "@ant-design/pro-layout/lib/BasicLayout";
import * as React from "react";
import {MenuDataItem} from "@ant-design/pro-layout/lib/typings";
import {BasicLayoutWrapperProps} from "ant-design-pro-starter/src/layouts/BasicLayout";
import SettingDrawer from "@ant-design/pro-layout/lib/SettingDrawer";
import {Settings} from "@ant-design/pro-layout/lib/defaultSettings";
import logo from '../assets/logo.svg';

const menuData: MenuDataItem[] = [
    {
        path: "home",
        name: "首页"
    }
];

const onSettingChange = (settings: Partial<Settings>) => {
    console.log(settings);
};

export const Example: React.FC<BasicLayoutWrapperProps> = props => {

    const {children} = props;
    return (
        <>
            <BasicLayout
                logo={() => <img src={logo} onClick={() => {
                    console.log("1")
                }}/>}
                menuData={menuData}>
                {children}
            </BasicLayout>
            <SettingDrawer {...props} onSettingChange={onSettingChange}/>
        </>
    )
}
