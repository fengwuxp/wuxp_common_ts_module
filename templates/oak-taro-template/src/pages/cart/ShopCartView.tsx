import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {observer} from '@tarojs/mobx'


// import styles from './styles.less';


interface ShopCartViewProps {

}

interface ShopCartViewState {

}


@observer
export default class ShopCartView extends Component<ShopCartViewProps, ShopCartViewState> {



    constructor(props: ShopCartViewProps, context: any) {
        super(props, context);
    }

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: '购物车'
    };

    componentWillMount() {
    }

    componentWillReact() {
        console.log('componentWillReact')
    }

    componentDidMount() {

        Taro.navigateBack()
    }

    componentWillUnmount() {
    }

    componentDidShow() {

    }

    componentDidHide() {
    }


    render() {
        return (
            <View>
                <Text>购物车</Text>
            </View>
        )
    }


}

