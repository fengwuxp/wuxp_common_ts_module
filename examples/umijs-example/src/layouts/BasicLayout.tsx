/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */

// import ProLayout, {
//   MenuDataItem,
//   BasicLayoutProps as ProLayoutProps,
//   Settings,
//   SettingDrawer,
//   DefaultFooter,
// } from '@ant-design/pro-layout';
import React, {useState} from 'react';
import DefaultFooter from "@ant-design/pro-layout/es/Footer"
import ProLayout, {BasicLayoutProps as ProLayoutProps} from "@ant-design/pro-layout/es/BasicLayout"
import {Settings} from '@ant-design/pro-layout/es/defaultSettings'
import {MenuDataItem} from "@ant-design/pro-layout/es/typings"
import SettingDrawer from '@ant-design/pro-layout/es/SettingDrawer/index'
import {HeartTwoTone} from '@ant-design/icons';
import AntdIcon from '@ant-design/icons/lib/components/AntdIcon';
import defaultSettings from '../../config/defaultSettings';

import Link from 'umi/link';
import history from 'umi/router';
import logo from '../assets/logo.svg';
import SelectLang from '@/components/SelectLang';
//
//import {ReactSVG} from 'react-svg'
import SVG from 'react-inlinesvg';
import SvgIcon from '@/components/icon/SvgIcon';

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
    ...defaultSettings,
    fixSiderbar: true,
    fixedHeader: true,
  });
  return (
    <>
      <ProLayout
        logo={logo}
        // siderWidth={200}
        menuHeaderRender={(logoDom, titleDom) => (
          <Link to="/">
            {logoDom}
            {titleDom}
          </Link>
        )}
        breakpoint={false}
        links={[
          <>
            <HeartTwoTone/>
            <span>name</span>
          </>,
        ]}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          // console.log("menuItemProps", menuItemProps, defaultDom);
          const icon = menuItemProps.icon as any;
          // console.log("icon", icon)

          const item = <span>
            <span style={{color: "#ff0000"}}>
              {typeof icon === "string" ? <SvgIcon className={"anticon"}
                                                   src={"http://192.168.80.1:8000/static/svg/alert.svg"}/> :
                <AntdIcon icon={icon}/>}
            </span>
            {menuItemProps.name}
          </span>
          return menuItemProps.isUrl ? (
            item
          ) : (
            <Link className="qixian-menuItem" to={menuItemProps.path || '/'}>
              {item}
            </Link>
          )
        }}

        rightContentRender={() => (
          <div
            style={{
              padding: '0 16px',
            }}
          >
            <SelectLang/>
          </div>
        )}
        collapsed={collapsed}
        onMenuHeaderClick={() => history.push('/')}
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
  )
    ;
};

export default BasicLayout;
