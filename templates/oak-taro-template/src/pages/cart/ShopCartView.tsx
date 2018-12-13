import Taro, {Config} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'

import TaroBaseView from "taro_starter/src/view/TaroBaseView";

import styles from './styles.less';


interface MemberViewProps {

}

interface MemberViewState {

}


export default class MemberView extends TaroBaseView<MemberViewProps, MemberViewState> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '个人中心'
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
      <View className={styles.view}>
        <Text>个人中心</Text>
      </View>
    )
  }
}

