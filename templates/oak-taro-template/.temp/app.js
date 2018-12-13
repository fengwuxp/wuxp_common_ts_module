import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { Provider } from "@tarojs/mobx-h5";

import counterStore from './store/counter';
import './app.less';
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
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
const store = {
  counterStore
};
class App extends Component {
  state = {
    __tabs: {
      list: [{
        pagePath: "pages/home/index",
        text: "首页",
        "iconPath": require("./../static_resources/images/tab/home.png"),
        "selectedIconPath": require("./../static_resources/images/tab/home-active.png")
      }, {
        pagePath: "pages/cart/index",
        text: "衣袋",
        "iconPath": require("./../static_resources/images/tab/cart.png"),
        "selectedIconPath": require("./../static_resources/images/tab/cart-active.png")
      }, {
        pagePath: "pages/cart/index",
        text: "衣袋",
        "iconPath": require("./../static_resources/images/tab/cart.png"),
        "selectedIconPath": require("./../static_resources/images/tab/cart-active.png")
      }, {
        pagePath: "pages/user/index",
        text: "我的",
        "iconPath": require("./../static_resources/images/tab/user.png"),
        "selectedIconPath": require("./../static_resources/images/tab/user-active.png")
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
  }
  componentDidMount() {
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
                    <Router mode={"hash"} publicPath={"/"} routes={[{
            path: '/pages/index/index',
            componentLoader: () => import( /* webpackChunkName: "index_index" */'./pages/index/index'),
            isIndex: true
          }]} />
                  </TabbarPanel>

                  <Tabbar mode={"hash"} publicPath={""} conf={this.state.__tabs} homePage="pages/index/index" router={Taro} />

                </TabbarContainer>
              </Provider>;
  }
  config = {
    pages: ['pages/index/index'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: { list: [{ pagePath: "pages/home/index", text: "首页", "iconPath": require("./../static_resources/images/tab/home.png"),
        "selectedIconPath": require("./../static_resources/images/tab/home-active.png")
      }, { pagePath: "pages/cart/index", text: "衣袋", "iconPath": require("./../static_resources/images/tab/cart.png"),
        "selectedIconPath": require("./../static_resources/images/tab/cart-active.png")
      }, { pagePath: "pages/cart/index", text: "衣袋", "iconPath": require("./../static_resources/images/tab/cart.png"),
        "selectedIconPath": require("./../static_resources/images/tab/cart-active.png")
      }, { pagePath: "pages/user/index", text: "我的", "iconPath": require("./../static_resources/images/tab/user.png"),
        "selectedIconPath": require("./../static_resources/images/tab/user-active.png")
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