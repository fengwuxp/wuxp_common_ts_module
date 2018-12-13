import WeexSdkStorage from "common_weex/src/storage/WeexSdkStorage";
import SimpleAppSessionManager from "common_auth/src/session/SimpleAppSessionManager";

//导出一个默认的weex 会话管理器
const weexDefaultSessionManager = new SimpleAppSessionManager(WeexSdkStorage);
export default weexDefaultSessionManager;