package com.oaknt.base.app.ui;

import android.support.v7.app.AppCompatActivity;

import com.gyf.barlibrary.ImmersionBar;
import com.levin.android.weex.support.WXPageActivity;

/**
 * 创建者     ky-wrg
 * 创建时间   2018/1/8
 * 描述         ${TODO}
 * <p/>
 * 更新者     $Author$
 * 更新时间   $Date$
 * 更新描述   ${TODO}
 */
public class AbsFragmentActivity extends AppCompatActivity {


    @Override
    protected void onPostResume() {

        super.onPostResume();

        initStatusBarView();
    }

    /**
     * 初始化界面
     * <p>
     * 默认是透明
     */
    protected void initStatusBarView() {

/*        ImmersionBar.with(this)
                .transparentBar()
                .init();*/

//        new SystemBarHelper.Builder()
        //   .statusBarColor()    // 设置状态栏颜色
//                .statusBarFontStyle()  // 设置状态栏时间,电量的风格, 6.0以上, 部分国产机可以不用6.0以上.
//                .navigationBarColor()  // 设置导航栏颜色
        //  .enableImmersedStatusBar(true)  // 布局嵌入状态栏，例如图片嵌入状态栏

//                .enableImmersedNavigationBar(true)  // 布局嵌入导航栏，例如图片嵌入导航栏
//                .enableAutoSystemBar(true)  // 根据状态栏下面的背景颜色自动调整状态栏的颜色, 自动调整状态栏时间,电量的风格, 默认是开启的
//                .into(this);


        ImmersionBar immersionBar = ImmersionBar.with(this);


        if (WXPageActivity.defaultStatusBarColor != null) {

            immersionBar
                    .fitsSystemWindows(true)
                    .statusBarColorInt(WXPageActivity.defaultStatusBarColor);
        } else {

            immersionBar
                    .transparentStatusBar()
                    .fitsSystemWindows(false);
        }


        immersionBar.init();

        Integer barColor = null;
/*

        if (hasContent(true, statusBarColor)) {
            try {
                barColor = Color.parseColor(statusBarColor.trim());
            } catch (Exception e) {
                Log.w(getLocalClassName(), "parseColor error :" + statusBarColor);
            }
        }


        if (barColor != null) {

            immersionBar.statusBarColorInt(barColor);

            Log.i(getLocalClassName(), "statusBarColor:" + statusBarColor);

        } else if (statusBarDefaultColorRes != 0) {

            immersionBar.statusBarColor(statusBarDefaultColorRes);

            Log.i(getLocalClassName(), "statusBarDefaultColorRes:" + statusBarDefaultColorRes);

        } else {

            immersionBar
                    .fitsSystemWindows(false)
                    .transparentBar();

            Log.i(getLocalClassName(), "transparentBar");
        }

        immersionBar.statusBarDarkFont(isStatusBarDarkFont);

        immersionBar.init();*/

    }

    @Override
    protected void onDestroy() {

        super.onDestroy();

        // 必须调用该方法，防止内存泄漏
        ImmersionBar.with(this).destroy();
    }
}
