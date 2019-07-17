import SimpleAppSessionManager from "fengwuxp_common_auth/src/session/SimpleAppSessionManager";
import TaroLocalStorage from "../storage/TaroLocalStorage";

//导出一个默认的taro 会话管理器
const taroDefaultSessionManager = new SimpleAppSessionManager(TaroLocalStorage);
export default taroDefaultSessionManager;