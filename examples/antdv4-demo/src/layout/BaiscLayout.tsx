/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */

// import  {
//     MenuDataItem,
//     BasicLayoutProps as ProLayoutProps,
//     Settings,
//     SettingDrawer,
// } from '@ant-design/pro-layout';
// import DefaultFooter from "@ant-design/pro-layout/es/Footer"
// import ProLayout from "@ant-design/pro-layout/es/BasicLayout"

import DefaultFooter from "@ant-design/pro-layout/es/Footer"
import ProLayout,{BasicLayoutProps as ProLayoutProps} from "@ant-design/pro-layout/es/BasicLayout"
import {Settings} from '@ant-design/pro-layout/es/defaultSettings'
import {MenuDataItem} from "@ant-design/pro-layout/es/typings"
import SettingDrawer from '@ant-design/pro-layout/es/SettingDrawer/index'

import React, {useState} from 'react';
import {HeartTwoTone} from '@ant-design/icons';
import logo from '../assets/logo.svg';

export interface BasicLayoutProps extends ProLayoutProps {
    breadcrumbNameMap: {
        [path: string]: MenuDataItem;
    };
}

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
    breadcrumbNameMap: {
        [path: string]: MenuDataItem;
    };
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
    const [collapsed, handleMenuCollapse] = useState<boolean>(false);
    const [settings, setSettings] = useState<Partial<Settings>>({
        fixSiderbar: true,
        fixedHeader: true,
    });
    return (
        <>
            <ProLayout
                // menuHeaderRender={false}
                logo={logo}
                siderWidth={200}
                menuHeaderRender={(logoDom, titleDom) => (
                    <div>
                        {logoDom}
                        {titleDom}
                    </div>
                )}
                breakpoint={false}
                links={[
                  <>
                    <HeartTwoTone />
                    <span>name</span>
                  </>,
                ]}
                onCollapse={handleMenuCollapse}
                menuItemRender={(menuItemProps, defaultDom) =>
                    menuItemProps.isUrl ? (
                        defaultDom
                    ) : (
                        <div className="qixian-menuItem">
                            {defaultDom}
                        </div>
                    )
                }
                rightContentRender={() => (
                    <div
                        style={{
                            padding: '0 16px',
                        }}
                    >
                        <HeartTwoTone/>
                    </div>
                )}
                collapsed={collapsed}
                onMenuHeaderClick={() => {
                    console.log("-->")
                }}
                footerRender={() => <DefaultFooter/>}
                {...props}
                {...settings}
            >
                {props.children}
            </ProLayout>
            <SettingDrawer
                // hideLoading
                // hideCopyButton
                // hideHintAlert
                settings={settings}
                onSettingChange={config => setSettings(config)}
            />
        </>
    );
};

export default BasicLayout;
