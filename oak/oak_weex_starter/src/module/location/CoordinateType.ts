/**
 * 坐标系类型
 */
export enum CoordinateType {

    ////地理坐标系统，Google Earth和中国外的Google Map使用，另外，目前基本上所有定位空间位置的设备都使用这种坐标系统，例如手机的GPS系统。
    WGS_84 = "wgs84",

    ////投影坐标系统，也就是我们平常所说的火星坐标系，Google Map中国、高德和腾讯好像使用，这个是中国自己在WGS84基础上加密而成，目的显而易见。
    GCJ_02 = "gcj02",

    //投影坐标系统，百度地图使用，在GCJ-02基础上二次加密而成。
    BD_09 = "bd09"
}
