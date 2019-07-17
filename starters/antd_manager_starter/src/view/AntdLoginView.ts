import {LoginView} from "fengwuxp_common_starter/src/views/account/LoginView";
import * as React from "react";


interface AntdLoginViewProps {

}

interface AntdLoginViewState {

}

/**
 * 基于ant design 实现的登录页面
 */
export default abstract class AntdLoginView extends React.Component<AntdLoginViewState, AntdLoginViewState> implements LoginView<React.ReactNode> {


    login: (...args) => any;

    renderBody: () => React.ReactNode;

    renderFooter: () => React.ReactNode;

    renderHeader: () => React.ReactNode;


}
