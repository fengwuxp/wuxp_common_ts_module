package com.oaknt.base.app;


import android.os.Bundle;
import android.support.v4.content.ContextCompat;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.levin.android.weex.support.SplashActivity;
import com.levin.android.weex.support.WXPageActivity;

import java.io.File;
import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;


/**
 *
 *
 *
 */
public class DefaultSplashActivity extends SplashActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {

        WXPageActivity.defaultStatusBarColor = ContextCompat.getColor(this, R.color.colorPrimary);

        defaultSplashRes = R.mipmap.app_launch_bg;

        super.onCreate(savedInstanceState);

        canBack = false;
    }


    @Override
    public void loadPage(final boolean forceLoad) {


        if (launchUrl != null) {
            super.loadPage(forceLoad);
        } else {

            OkHttpClient okHttpClient = new OkHttpClient();

            Request request = new Request.Builder()
                    .url(BuildConfig.API_URL + "/config?name=android_weex_remote")
                    .build();

            okHttpClient.newCall(request).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    showError("无法获取有效的主页");
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {

                    JsonObject jsonObject = new JsonParser().parse(response.body().string()).getAsJsonObject();

                    File file = new File(BuildConfig.LOCAL_LAUNCH_URL);

                    boolean remote = jsonObject.getAsJsonPrimitive("code").getAsInt() == 0
                            && "true".equalsIgnoreCase(jsonObject.getAsJsonPrimitive("data").getAsString()) || !file.exists();

                    // Log.i(getLocalClassName(),jsonObject.toString());


                    launchUrl = (remote) ? BuildConfig.REMOTE_LAUNCH_URL : BuildConfig.LOCAL_LAUNCH_URL;

                    DefaultSplashActivity.super.loadPage(forceLoad);

                }
            });
        }
    }

}
