import Taro from '@tarojs/taro-h5';
import * as tslib_1 from "tslib";
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View, Text } from '@tarojs/components';
import { observer } from "@tarojs/mobx-h5";
let ShopCartView = class ShopCartView extends Component {
  constructor(props, context) {
    super(props, context);
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
    return <View>
                <Text>购物车</Text>
            </View>;
  }
  config = {
    navigationBarTitleText: '购物车'
  };
};
ShopCartView = tslib_1.__decorate([observer], ShopCartView);
export default ShopCartView;