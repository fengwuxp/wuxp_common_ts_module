package com.oaknt.base.app.bean;

/**
 * 创建者     ky-wrg
 * 创建时间   17/9/29
 * 描述         ${TODO}
 * <p/>
 * 更新者     $Author$
 * 更新时间   $Date$
 * 更新描述   ${TODO}
 */
public class AddCartTrackBody {
    /**
     * 客户端id
     * @dataType {string}
     */
    private String clientId = "app";

    /**
     * 客户端秘钥
     * @dataType {string}
     */
    private String clientSecret = "3f76f41054769548fa8c8962f2ed0cbb";
    //车辆
    private Long carsId;

    //运单
    private Long recordId;

    //位置名称
    private String position;

    //位置-经度
    private Double longitude;//精度 12,6

    //位置-纬度
    private Double latitude;//精度 12,6

    //时间
    private String addTime;//yyyy-MM-dd HH:mm:ss

    public Long getCarsId() {
        return carsId;
    }

    public void setCarsId(Long carsId) {
        this.carsId = carsId;
    }

    public Long getRecordId() {
        return recordId;
    }

    public void setRecordId(Long recordId) {
        this.recordId = recordId;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public String getAddTime() {
        return addTime;
    }

    public void setAddTime(String addTime) {
        this.addTime = addTime;
    }

    public String getClientId() {
        return clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }
}
