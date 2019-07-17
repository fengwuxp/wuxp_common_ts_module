import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Switch} from "react-router";
import createBrowserHistory from 'history/createBrowserHistory';
import ResolverRegister from "fengwuxp_common_fetch/src/register/ResolverRegister";
import NeedProgressBarInterceptor from "fengwuxp_common_fetch/src/interceptor/default/NeedProgressBarInterceptor";
import FetchInterceptorRegister from "fengwuxp_common_fetch/src/register/FetchInterceptorRegister";
import HistoryRegistry from "fengwuxp_common_route/src/registry/HistoryRegistry";
import PopupLayerHelper from "fengwuxp_common_react/src/components/popup-layer/PopupLayerHelper";
import CustomArgumentsResolver from "./resolver/CustomArgumentsResolver";
import CustomRequestURLResolver from "./resolver/CustomRequestURLResolver";
import {ConnectedRouter} from 'connected-react-router'
import StoreRepository from './store/StoreRepository';
import DefaultRouteLayout from "antd_manager_starter/src/layout/DefaultRouteLayout";
import Spin from "antd/lib/spin";
import BasicLayout from "antd_manager_starter/src/layout/RouteLayout";


//注册fetch client 拦截器
FetchInterceptorRegister.register("", new NeedProgressBarInterceptor({
    showProgressBar: () => {
        PopupLayerHelper.popup(<Spin spinning={true} size={"large"}/>);
    },
    hideProgressBar: () => {
        PopupLayerHelper.close();
    }
}));


//创建history
const history = createBrowserHistory();
//注册history
HistoryRegistry.register(history);


//注册fetch
ResolverRegister.registerArgumentsResolver(new CustomArgumentsResolver());
ResolverRegister.registerRequestURLResolver(new CustomRequestURLResolver());

//创建store
const store = StoreRepository.init(history);


function render(isLogin) {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/" render={(props: any) => <BasicLayout {...props}
                                                                         routes={[]}
                                                                         siteName={""}
                                                                         layout={DefaultRouteLayout}/>}/>
                </Switch>
            </ConnectedRouter>
        </Provider>,
        document.getElementById("app"));
}
