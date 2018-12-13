import Taro from '@tarojs/taro-h5';
import * as tslib_1 from "tslib";
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from "@tarojs/mobx-h5";
import './index.less';
let Index = class Index extends Component {
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
  componentWillMount() {}
  componentWillReact() {
    console.log('componentWillReact');
  }
  componentDidMount() {
    Taro.navigateBack();
  }
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  render() {
    const { counterStore: { counter } } = this.props;
    return <View className="index">
                <Button onClick={this.increment}>+</Button>
                <Button onClick={this.decrement}>-</Button>
                <Button onClick={this.incrementAsync}>Add Async</Button>
                <Text>{counter}</Text>
            </View>;
  }
  config = {
    navigationBarTitleText: '首页'
  };
  increment = () => {
    const { counterStore } = this.props;
    counterStore.increment();
  };
  decrement = () => {
    const { counterStore } = this.props;
    counterStore.decrement();
  };
  incrementAsync = () => {
    const { counterStore } = this.props;
    counterStore.incrementAsync();
  };
};
Index = tslib_1.__decorate([inject('counterStore'), observer], Index);
export default Index;