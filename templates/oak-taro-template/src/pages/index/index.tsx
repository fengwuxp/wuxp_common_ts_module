import Taro, {Component, Config} from '@tarojs/taro'
import {View, Button, Text} from '@tarojs/components'
import {observer, inject} from '@tarojs/mobx'
//在feign代理初始化后导入代理服务
import MemberSpaceService from "../../services/member/MemberSpaceService";


interface IndexProps {
    counterStore?: any
}

@inject('counterStore')
@observer
class Index extends Component<IndexProps, {}> {

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: '首页'
    };

    componentWillMount() {
        MemberSpaceService.queryLikeStore({
            memberId: 1
        })
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

    increment = () => {
        const {counterStore} = this.props;
        counterStore.increment()
    };

    decrement = () => {
        const {counterStore} = this.props;
        counterStore.decrement()
    };

    incrementAsync = () => {
        const {counterStore} = this.props;
        counterStore.incrementAsync()
    };

    render() {
        const {counterStore: {counter}} = this.props;
        return (
            <View>
                <Button onClick={this.increment}>+</Button>
                <Button onClick={this.decrement}>-</Button>
                <Button onClick={this.incrementAsync}>Add Async</Button>
                <Text>{counter}</Text>
            </View>
        )
    }
}

export default Index
