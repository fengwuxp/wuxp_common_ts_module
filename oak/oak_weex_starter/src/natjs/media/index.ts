import {NatJsVideoModule} from "./video/NatJsVideoModule";
import {NatJsAudioModule} from "./audio/NatJsAudioModule";


export const natJsVideoModule: NatJsVideoModule = weex.requireModule('video');
export const natJsAudioModule: NatJsAudioModule = weex.requireModule('audio');