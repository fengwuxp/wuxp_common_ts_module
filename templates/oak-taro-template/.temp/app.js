import * as OakTaro from "oak_taro_starter/lib";
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { Provider } from "@tarojs/mobx-h5";

import counterStore from './store/counter';
import './app.less';
import { View, Tabbar, TabbarContainer, TabbarPanel } from '@tarojs/components';
import Taro from '@tarojs/taro-h5';
import { Router } from '@tarojs/router';
Taro.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});
new OakTaro.OAKTaroFeignProxyInitializer(Taro, {
  apiEntryAddress: "http://test.meazoo.com"
}).initFeignProxyFactory();
//在feign代理初始化后倒入代理服务
// import MemberSpaceService from "./services/member/MemberSpaceService";
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
const store = {
  counterStore
};
class App extends Component {
  state = {
    __tabs: {
      list: [{
        pagePath: "pages/index/index",
        text: "首页",
        "iconPath": require("././static_resources/images/tab/home.png"),
        "selectedIconPath": require("././static_resources/images/tab/home-active.png")
      }, {
        pagePath: "pages/cart/ShopCartView",
        text: "衣袋",
        "iconPath": require("././static_resources/images/tab/cart.png"),
        "selectedIconPath": require("././static_resources/images/tab/cart-active.png")
      }, {
        pagePath: "pages/member/MemberView",
        text: "我的",
        "iconPath": require("././static_resources/images/tab/user.png"),
        "selectedIconPath": require("././static_resources/images/tab/user-active.png")
      }],
      color: '#333333',
      selectedColor: '#333333',
      backgroundColor: '#ffffff'
    }
  };

  constructor() {
    super(...arguments);
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */

    Taro._set$app(this);
  }
  componentDidMount() {
    const MemberSpaceService = require("./services/member/MemberSpaceService").default;
    MemberSpaceService.queryLikeStore({
      memberId: 1
    });
    this.componentDidShow();
  }
  componentDidShow() {}
  componentDidHide() {}
  componentDidCatchError() {}
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={store}>
                
                <TabbarContainer>

                  <TabbarPanel>
                    <Router mode={"browser"} publicPath={""} routes={[{
            path: '/pages/index/index',
            componentLoader: () => import( /* webpackChunkName: "index_index" */'./pages/index/index'),
            isIndex: true
          }, {
            path: '/pages/cart/ShopCartView',
            componentLoader: () => import( /* webpackChunkName: "cart_ShopCartView" */'./pages/cart/ShopCartView'),
            isIndex: false
          }, {
            path: '/pages/member/MemberView',
            componentLoader: () => import( /* webpackChunkName: "member_MemberView" */'./pages/member/MemberView'),
            isIndex: false
          }]} />
                  </TabbarPanel>

                  <Tabbar mode={"browser"} publicPath={""} conf={this.state.__tabs} homePage="pages/index/index" router={Taro} />

                </TabbarContainer>
              </Provider>;
  }
  config = {
    pages: ['pages/index/index', 'pages/cart/ShopCartView', 'pages/member/MemberView'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: { list: [{ pagePath: "pages/index/index", text: "首页", "iconPath": require("././static_resources/images/tab/home.png"),
        "selectedIconPath": require("././static_resources/images/tab/home-active.png")
      }, { pagePath: "pages/cart/ShopCartView", text: "衣袋", "iconPath": require("././static_resources/images/tab/cart.png"),
        "selectedIconPath": require("././static_resources/images/tab/cart-active.png")
      }, { pagePath: "pages/member/MemberView", text: "我的", "iconPath": require("././static_resources/images/tab/user.png"),
        "selectedIconPath": require("././static_resources/images/tab/user-active.png")
      }], color: '#333333', selectedColor: '#333333', backgroundColor: '#ffffff' }
  };

  componentWillUnmount() {
    this.componentDidHide();
  }

  componentWillMount() {
    Taro.initTabBarApis(this, Taro);
  }

}
Nerv.render(<App />, document.getElementById('app'));