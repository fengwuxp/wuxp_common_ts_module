import Taro, {Component, Config} from '@tarojs/taro'
import {Provider} from '@tarojs/mobx'
import Index from './pages/index'
import counterStore from './store/counter'
import './app.less'

import {OAKTaroFeignProxyInitializer} from "oak_taro_starter/lib";

new OAKTaroFeignProxyInitializer(Taro, {
    apiEntryAddress: "http://test.meazoo.com"
} as any).initFeignProxyFactory();

import MemberSpaceService from "./services/member/MemberSpaceService";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
    counterStore
};


class App extends Component {

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        pages: [
            'pages/index/index',
            'pages/cart/ShopCartView',
            'pages/member/MemberView'
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        },

        tabBar: {
            list: [
                {
                    pagePath: "pages/index/index",
                    text: "首页",
                    iconPath: "./static_resources/images/tab/home.png",
                    selectedIconPath: "./static_resources/images/tab/home-active.png"
                },

                {
                    pagePath: "pages/cart/ShopCartView",
                    text: "衣袋",
                    iconPath: "./static_resources/images/tab/cart.png",
                    selectedIconPath: "./static_resources/images/tab/cart-active.png"
                },
                {
                    pagePath: "pages/member/MemberView",
                    text: "我的",
                    iconPath: "./static_resources/images/tab/user.png",
                    selectedIconPath: "./static_resources/images/tab/user-active.png"
                }
            ],
            color: '#333333',
            selectedColor: '#333333',
            backgroundColor: '#ffffff',
        }
    };

    componentDidMount() {
        MemberSpaceService.queryLikeStore({
            memberId: 1
        }).then(()=>{
            console.log("1")
        }).catch(()=>{
            console.log("2")
        }).finally(()=>{
            console.log("3")
        });
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    componentDidCatchError() {
    }

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render() {
        let c=<Provider store={store}>
            <Index/>
        </Provider>
        return c;
    }
}

Taro.render(<App/>, document.getElementById('app'));
