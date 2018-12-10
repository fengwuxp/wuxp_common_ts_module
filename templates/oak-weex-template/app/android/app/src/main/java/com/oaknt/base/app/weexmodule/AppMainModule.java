package com.oaknt.base.app.weexmodule;

import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import com.levin.android.weex.support.WXPageActivity;
import com.levin.android.weex.support.utils.NetworkUtils;

import com.oaknt.base.app.bean.Location;
import com.oaknt.base.app.ui.ProtocolActivity;
import com.oaknt.base.app.ui.WebActivity_;
import com.oaknt.base.app.util.HtmlBuilder;
import com.oaknt.base.app.util.LocationHelper;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;

import java.util.HashMap;
import java.util.Map;

/**
 * 创建者     ky-wrg
 * 创建时间   17/7/10
 * 描述         ${TODO}
 * <p/>
 * 更新者     $Author$
 * 更新时间   $Date$
 * 更新描述   ${TODO}
 */
public class AppMainModule extends com.levin.android.weex.support.module.app.AppMainModule {
    @JSMethod
    public void showProgressBar(int autoHideSeconds, final JSCallback delayCallback) {

        WXPageActivity pageActivity = getWXPageActivity();

        if (pageActivity == null)
            return;

        pageActivity.showProgressBar();

        if (autoHideSeconds > 0) {
            pageActivity.invokeAsyncTask(autoHideSeconds * 1000L, new Runnable() {
                @Override
                public void run() {
                    hideProgressBar();
                    if (delayCallback != null) {
                        delayCallback.invokeAndKeepAlive("timeout");
                    }
                }
            });
        }

        //

    }

    @JSMethod
    public void hideProgressBar() {

        WXPageActivity pageActivity = getWXPageActivity();

        if (pageActivity == null)
            return;

        pageActivity.hideProgressBar();

    }

    /**
     * 获取当前的网络状态
     * 返回值说明：
     * <p>
     * > 0 大于0表示有网络，1表示wifi，2表示电话网络
     * = 0 没网络
     * = -1 未知
     *
     * @return netType
     */
    @JSMethod(uiThread = false)
    public int getNetworkType(JSCallback jsCallback) {

        try {
            int networkType = NetworkUtils.getNetworkType(mWXSDKInstance.getContext());

            if (jsCallback != null)
                jsCallback.invokeAndKeepAlive(networkType);

            return networkType;

        } catch (Exception e) {
            Log.w(getClass().getName(), "getNetworkType", e);
        }

        return -1;
    }

    public WXPageActivity getWXPageActivity() {

        if (mWXSDKInstance.getContext() instanceof WXPageActivity) {

            WXPageActivity pageActivity = (WXPageActivity) mWXSDKInstance.getContext();

            return pageActivity;
        }

        return null;
    }

    @JSMethod
    public void share(Map param, final JSCallback successCallback, final JSCallback failureCallback) {
        if (param != null && param.containsKey("type")) {
            //ShareHelper.getInstance().shareForWeex(mWXSDKInstance.getContext(), param, successCallback, failureCallback);
        } else {
            if (failureCallback != null) {
                failureCallback.invokeAndKeepAlive("分享参数不能为空");
            }
        }
    }

    @JSMethod
    public void openActivity(String action, Map param, final JSCallback successCallback, final JSCallback failureCallback) {
        super.openActivity(action,param,successCallback,failureCallback);

        final Map<String, String> errMap = new HashMap<>();
        try {
            if ("lease_agreement".equalsIgnoreCase(action) || "HTML_CONTENT".equalsIgnoreCase(action)){
                if (param.containsKey("html")){
                    Intent intent=new Intent(mWXSDKInstance.getContext(),ProtocolActivity.class);
                    intent.putExtra("html", HtmlBuilder.createHtml((String)param.get("html")));
                    intent.putExtra("title",param.containsKey("title")?(String)param.get("title"):"");
                    mWXSDKInstance.getContext().startActivity(intent);
                } else {
                    if (failureCallback != null) {
                        errMap.put("message", "参数不可空");
                        failureCallback.invokeAndKeepAlive(errMap);
                    }
                }
            }else if ("link".equalsIgnoreCase(action)){
                if (param!=null && param.containsKey("url")){
                    Intent intent=new Intent(getWXPageActivity(), WebActivity_.class);
                    intent.putExtra("url",(String)param.get("url"));
                    intent.putExtra("title",param.containsValue("title")?(String)param.get("title"):"");
                    getWXPageActivity().startActivity(intent);
                }else{
                    if (failureCallback != null) {
                        errMap.put("message", "url参数不可空");
                        failureCallback.invokeAndKeepAlive(errMap);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            if (failureCallback != null) {
                errMap.put("message", "跳转失败:" + e);
                failureCallback.invokeAndKeepAlive(errMap);
            }
        }
    }

    @JSMethod
    public void getMyLocation(int isOpen, final JSCallback successCallback, final JSCallback failureCallback) {
        if (isOpen == 1 || LocationHelper.getInstance().getCurrLocation() == null) {
            //定位
            LocationHelper.getInstance().startLocation(mWXSDKInstance.getContext(), true, new LocationHelper.OnBackListener() {
                @Override
                public void onFailed(final int errorCode) {
                    mWXSDKInstance.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            failureCallback.invokeAndKeepAlive(null);
                        }
                    });
                }

                @Override
                public void onSuccess(final Location location) {

                    mWXSDKInstance.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            callBackLocation(location, successCallback);
                        }
                    });
                }
            });
        } else {
            callBackLocation(LocationHelper.getInstance().getCurrLocation(), successCallback);
        }
    }

    private void callBackLocation(Location location, final JSCallback successCallback) {
        Map<String, Object> map = new HashMap<>();
        map.put("latitude", location.lat);
        map.put("longitude", location.lng);
        map.put("province", location.province);
        map.put("city", location.city);
        map.put("address", location.address);
        map.put("areaCode", location.areaCode);
        map.put("district", location.district);
        map.put("street", location.street);
        map.put("streetNumber", location.streetNumber);

        successCallback.invokeAndKeepAlive(map);
    }

    @JSMethod
    public void callPhone(boolean directCall, String phoneNbr, final JSCallback successCallback, final JSCallback failureCallback) {
        if (phoneNbr == null || phoneNbr.trim().length() == 0) {
            if (failureCallback != null) {
                failureCallback.invokeAndKeepAlive("呼叫号码不能为空");
            }
            return;
        }
        try {
            WXPageActivity pageActivity = getWXPageActivity();
            if (pageActivity == null) {
                failureCallback.invokeAndKeepAlive("呼叫失败");
                return;
            }
            if (directCall) {
                Intent intent = new Intent(Intent.ACTION_DIAL, Uri.parse("tel:" + phoneNbr));
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                pageActivity.startActivity(intent);
            } else {
                Intent intent = new Intent(Intent.ACTION_DIAL, Uri.parse("tel:" + phoneNbr));
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                pageActivity.startActivity(intent);
            }
            if (successCallback != null) {
                successCallback.invokeAndKeepAlive("成功");
            }
        } catch (Exception e) {
            e.printStackTrace();
            if (failureCallback != null) {
                failureCallback.invokeAndKeepAlive("呼叫失败");
            }
        }
    }
}
