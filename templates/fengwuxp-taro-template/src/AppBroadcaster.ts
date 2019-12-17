import {
  AppCommandBroadcaster,
  EmitEventMethod,
  ReceiveEventListenerMethod,
} from 'fengwuxp-declarative-broadcast-adapter'
import {tarojsAppCommandBroadcasterFactory} from 'fengwuxp-tarojs-broadcast'


/**
 * 应用广播事件定义
 */
export interface AppBroadcasterInterface extends AppCommandBroadcaster {


}

export const AppBroadcaster = tarojsAppCommandBroadcasterFactory<AppBroadcasterInterface>();
