import {tarojsAppCommandRouterFactory} from 'fengwuxp-tarojs-router'
import {
  AppCommandRouter,
  NavigatorDescriptorObject,
  RouteConfirmBeforeJumping,
  RouterCommandMethod
} from 'fengwuxp-declarative-router-adapter'


export interface AppRouterInterface extends AppCommandRouter {

  /**
   *
   *
   * 跳转到首页
   */
  index: RouterCommandMethod


  isLoginView: () => boolean
  isIndexView: () => boolean

}

const routeConfirmBeforeJumping: RouteConfirmBeforeJumping = (nextNavigator: NavigatorDescriptorObject) => {

  // 判断是否需要登录
  if (nextNavigator.pathname) {

  }

  return true
};

export const AppRouter = tarojsAppCommandRouterFactory<AppRouterInterface>(undefined, routeConfirmBeforeJumping);
