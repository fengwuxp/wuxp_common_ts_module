import BasicLayout, {
    BasicLayoutProps,
    SettingDrawer,
    Settings,
} from '@ant-design/pro-layout';
import React, {useState} from 'react';


export interface BasicLayoutWrapperProps extends BasicLayoutProps {
    settings: Settings;
    logo: string;
}

const BasicLayoutWrapper: React.FC<BasicLayoutWrapperProps> = props => {
    const {logo, children} = props;
    /**
     * constructor
     */
    useState(() => {

    });

    const onSettingChange = (settings: Partial<Settings>) => {

    };
    return (
        <>
            <BasicLayout
                logo={() => <img src={logo} onClick={() => {
                }}/>}
                {...props}
                {...props.settings}
                onCollapse={payload => {

                }}
                menuDataRender={menuList => {
                    return menuList.map(item => {
                        return Authorized.check(item.authority, item, null) as MenuDataItem;
                    });
                }}
                itemRender={route => {
                    return <Link to={route.path}>{route.breadcrumbName}</Link>;
                }}
                menuItemRender={(props, defaultDom) => (
                    <Link to={props.path}>{defaultDom}</Link>
                )}
                rightContentRender={rightProps => <RightContent {...rightProps} />}
            >
                {children}
            </BasicLayout>
            <SettingDrawer {...props} onSettingChange={onSettingChange}/>
        </>
    );
};


export default BasicLayoutWrapper;