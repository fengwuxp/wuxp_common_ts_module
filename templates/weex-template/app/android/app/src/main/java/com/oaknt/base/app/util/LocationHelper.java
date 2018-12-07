package com.oaknt.base.app.util;


import android.content.Context;
import android.location.LocationManager;

import com.baidu.location.BDLocation;
import com.baidu.location.BDLocationListener;
import com.baidu.location.LocationClient;
import com.baidu.location.LocationClientOption;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.oaknt.base.app.bean.AddCartTrackBody;
import com.oaknt.base.app.bean.CarLocationCache;
import com.oaknt.base.app.bean.Location;
import com.oaknt.base.app.provider.CarLocationDBUtil;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import okhttp3.Call;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


/**
 * 创建者     ky-wrg
 * 创建时间   17/3/22
 * 描述       定位
 * <p/>
 * 更新者     $Author$
 * 更新时间   $Date$
 * 更新描述   ${TODO}
 */
public class LocationHelper {
    public static LocationHelper instance;
    private int OUT_TIME = 600;
    private long lastTime = 0L;
    private LocationClient mLocationClient;
    private Location currLocation;
    private List<OnBackListener> listeners = new ArrayList<OnBackListener>();
    private int state = 0;

    private LocationHelper() {
    }

    public static LocationHelper getInstance() {
        if (instance == null) {
            instance = new LocationHelper();
        }
        return instance;
    }

    /**
     * @return void
     * @throws
     * @函数名称: startLocation
     * @功能描述: 开始定位请求，结果在回调中
     */
    public void startLocation(Context context, boolean forceLocation, OnBackListener onBackListener) {
        long l = System.currentTimeMillis();
        if (currLocation!=null && !Strings.isNullOrEmpty(currLocation.address) && (l - this.lastTime) < this.OUT_TIME && !forceLocation) {
            onBackListener.onSuccess(currLocation);
            return;
        }
        listeners.add(onBackListener);
        LocationManager locManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
        if (!locManager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
            // 未打开位置开关，可能导致定位失败或定位不准，提示用户或做相应处理
            ToastUtil.showMessage("定位服务未开启，可能导致定位失败或定位不准");
        }

        mLocationClient = new LocationClient(context.getApplicationContext());
        mLocationClient.registerLocationListener(new MyLocationListenner());
        LocationClientOption option = new LocationClientOption();
        // 高精度定位模式：这种定位模式下，会同时使用网络定位和GPS定位，优先返回最高精度的定位结果；
        option.setLocationMode(LocationClientOption.LocationMode.Hight_Accuracy);
        // 设置是否打开gps，使用gps前提是用户硬件打开gps。默认是不打开gps的。
        option.setOpenGps(true);
        // 设置坐标类型 返回的定位结果是百度经纬度,默认值gcj02国测局经纬度坐标系
        option.setCoorType("bd09ll");
        // 可选，默认0，即仅定位一次，设置发起定位请求的间隔需要大于等于1000ms才是有效的
        option.setScanSpan(0);
        option.setIsNeedAddress(true);// 返回的定位结果包含地址信息
        //option.setLocationNotify(true);//可选，默认false，设置是否当gps有效时按照1S1次频率输出GPS结果
        //option.setIgnoreKillProcess(true);//可选，默认true，定位SDK内部是一个SERVICE，并放到了独立进程，设置是否在stop的时候杀死这个进程，默认不杀死
        //option.setIsNeedLocationPoiList(true); //设置是否需要返回位置POI信息，可以在BDLocation.getPoiList()中得到数据
        option.setIsNeedLocationDescribe(true);//设置是否需要返回位置语义化信息，可以在BDLocation.getLocationDescribe()中得到数据，ex:"在天安门附近"， 可以用作地址信息的补充
        option.setIsNeedAddress(true);//需要地址信息
        // 设置产品线名称：设置产品线名称。强烈建议您使用自定义的产品线名称，方便我们以后为您提供更高效准确的定位服务。
        //option.setProdName(strProductName);
        option.setTimeOut(OUT_TIME);
        mLocationClient.setLocOption(option);

        mLocationClient.start();
    }

    /**
     * 上传位置
     * @param trackBody
     * @return
     */
    public boolean uploadLocation(AddCartTrackBody trackBody){
        try {
            String url = AppConfig.API_URL + "/addCarsTrack";
            OkHttpClient okHttpClient = new OkHttpClient.Builder()
                    .connectTimeout(10000L, TimeUnit.MILLISECONDS)
                    .readTimeout(10000L, TimeUnit.MILLISECONDS)
                    //其他配置
                    .build();
            StringBuffer params = new StringBuffer();
            Field[] fields = AddCartTrackBody.class.getDeclaredFields();
            Field.setAccessible(fields, true);
            for (Field field : fields) {
                Object o = field.get(trackBody);
                String value = "";
                if (o != null) {
                    value = o.toString();
                }
                params.append(field.getName()).append("=").append(value).append("&");
            }

            int length = params.length();
            params = params.delete(length - 1, length);

            MediaType mediaType = MediaType.parse("application/x-www-form-urlencoded;charset=UTF-8");
            RequestBody formBody = RequestBody.create(mediaType,params.toString());
            Request request = new Request.Builder().url(url).post(formBody).build();

            Call call = okHttpClient.newCall(request);

            Response response = call.execute();
            if (response.isSuccessful()) {
                String json = response.body().string();
                Gson gson = new Gson();
                Map<String,Object> map=gson.fromJson(json,new TypeToken<Map<String,Object>>(){}.getType());
                if ((Double)map.get("code") == 0)
                    return true;
                else
                    return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 重新上传位置
     * @param context
     */
    public void uploadCacheLocation(Context context){
        List<CarLocationCache> list=CarLocationDBUtil.query(context);
        if (list!=null && list.size()>0){
            boolean b=true;
            for (CarLocationCache cache:list){
                b=uploadLocation(cache.getBody());
                if (b){
                    CarLocationDBUtil.delete(context,cache.getId());
                }
            }
        }
    }
    /**
     * @类名称：MyLocationListenner
     * @类描述： 定位监听类
     * @创建人：SQWANG
     * @创建时间：2015-2-27 下午12:06:33
     * @修改人：
     * @修改时间：
     * @修改备注：
     * @版本：V1.0
     */
    public class MyLocationListenner implements BDLocationListener {
        @Override
        public void onReceiveLocation(BDLocation location) {
            mLocationClient.stop();// 停止定位

            doLocationResult(location);
        }
    }

    /**
     * 非UI线程
     *
     * @param location 定位返回错误码查询：
     *                 61 ： GPS定位结果，GPS定位成功。
     *                 62 ： 无法获取有效定位依据，定位失败，请检查运营商网络或者wifi网络是否正常开启，尝试重新请求定位。
     *                 63 ： 网络异常，没有成功向服务器发起请求，请确认当前测试手机网络是否通畅，尝试重新请求定位。
     *                 65 ： 定位缓存的结果。
     *                 66 ： 离线定位结果。通过requestOfflineLocaiton调用时对应的返回结果。
     *                 67 ： 离线定位失败。通过requestOfflineLocaiton调用时对应的返回结果。
     *                 68 ： 网络连接失败时，查找本地离线定位时对应的返回结果。
     *                 161： 网络定位结果，网络定位定位成功。
     *                 162： 请求串密文解析失败。
     *                 167： 服务端定位失败，请您检查是否禁用获取位置信息权限，尝试重新请求定位。
     *                 502： key参数错误，请按照说明文档重新申请KEY。
     *                 505： key不存在或者非法，请按照说明文档重新申请KEY。
     *                 601： key服务被开发者自己禁用，请按照说明文档重新申请KEY。
     *                 602： key mcode不匹配，您的ak配置过程中安全码设置有问题，请确保：sha1正确，“;”分号是英文状态；
     *                 且包名是您当前运行应用的包名，请按照说明文档重新申请KEY。
     *                 501～700：key验证失败，请按照说明文档重新申请KEY。
     *                 如果不能定位，请记住这个返回值，并到百度LBS开放平台论坛Andriod定位SDK版块中进行交流
     *                 http://bbs.lbsyun.baidu.com/forum.PHP?mod=forumdisplay&fid=10 。
     *                 若返回值是162~167，请将错误码、imei和定位时间反馈至loc-bugs@baidu.com，
     *                 以便我们跟进追查问题。
     * @函数名称: doLocationResult
     * @功能描述: 处理定位结果
     */
    public void doLocationResult(final BDLocation location) {
        boolean bLocationSuccess = false;

        if (location.getLocType() == BDLocation.TypeGpsLocation) {// GPS定位结果
            bLocationSuccess = true;
        } else if (location.getLocType() == BDLocation.TypeNetWorkLocation) {// 网络定位结果
            bLocationSuccess = true;
        } else if (location.getLocType() == BDLocation.TypeOffLineLocation) {// 离线定位结果
            bLocationSuccess = true;
        } else if (location.getLocType() == BDLocation.TypeServerError) {
            bLocationSuccess = false;
        } else if (location.getLocType() == BDLocation.TypeNetWorkException) {
            bLocationSuccess = false;
        } else if (location.getLocType() == BDLocation.TypeCriteriaException) {
            bLocationSuccess = false;
        }
        this.lastTime = System.currentTimeMillis();

        Iterator localIterator = listeners.iterator();
        HashMap hm = new HashMap();
        if (!bLocationSuccess) {//定位失败
            while (localIterator.hasNext()) {
                ((OnBackListener) localIterator.next()).onFailed(location.getLocType());
            }
        } else {
            hm.put("LocationResult", true);
            currLocation = new Location();
            //包含地址信息
            if (location.hasAddr()) {
                currLocation.address = location.getAddrStr();
                currLocation.province = location.getProvince();
                currLocation.city = location.getCity();
                currLocation.areaCode = location.getCityCode();
                currLocation.district = location.getAddress().district;
                currLocation.street = location.getAddress().street;
                currLocation.streetNumber = location.getAddress().streetNumber;
            }

            currLocation.lat = location.getLatitude();
            currLocation.lng = location.getLongitude();

            while (localIterator.hasNext()) {
                ((OnBackListener) localIterator.next()).onSuccess(currLocation);
            }
        }
        listeners.clear();
    }

    public Location getCurrLocation() {
        return currLocation;
    }

    public interface OnBackListener {
        public void onFailed(int errorCode);

        public void onSuccess(Location location);
    }
}
