package com.oaknt.base.app.bean;

import java.util.HashMap;
import java.util.Map;

/**
 * 创建者     ky-wrg
 * 创建时间   17/3/22
 * 描述       位置信息
 * <p/>
 * 更新者     $Author$
 * 更新时间   $Date$
 * 更新描述   ${TODO}
 */
public class Location {
    public Map<String, Object> additionalProperties = new HashMap();
    public double lat;
    public double lng;

    public String province;
    public String city;
    public String address;
    public String areaCode;
    public String district;
    public String street;
    public String streetNumber;

    public String toString() {
        return "lat:" + lat + ";lng:" + lng + ";province:" + province + ";city:" + city + ";address:" + address + ";areaCode:" + areaCode + ";district:" + district + ";street:" + street + ";streetNumber:" + streetNumber;
    }
}
