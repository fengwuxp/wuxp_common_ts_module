package com.oaknt.base.app.ui;

import android.os.Bundle;
import android.util.DisplayMetrics;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.ImageView;
import android.widget.TextView;

import com.oaknt.base.app.R;


/**
 * 用户协议
 */
public class ProtocolActivity extends AbsFragmentActivity implements View.OnClickListener{
    private final String TAG=ProtocolActivity.class.getSimpleName();
    private WebView webView;
    private String agreement,title;
    /**
     * Called when the activity is first created.
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.protocol);
        initStatusBarView();
        if (getIntent()!=null){
            agreement=getIntent().getStringExtra("html");
            title=getIntent().getStringExtra("title");
        }
        findViewById();

    }
    public void findViewById(){
        ImageView btnView=(ImageView)this.findViewById(R.id.back);
        btnView.setVisibility(View.VISIBLE);
        btnView.setOnClickListener(this);

        TextView topTitleView=(TextView)this.findViewById(R.id.txtTitle);
        topTitleView.setText(title);
        webView=(WebView)this.findViewById(R.id.webview);
        WebSettings webSettings=webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setSupportZoom(false);
        webSettings.setBuiltInZoomControls(false);
        webSettings.setUseWideViewPort(true);//无限缩放
        webSettings.setDefaultTextEncodingName("UTF-8");
        int  screenDensity  = getResources().getDisplayMetrics().densityDpi ;
        WebSettings.ZoomDensity  zoomDensity  = WebSettings.ZoomDensity.MEDIUM ;
        switch (screenDensity){
            case  DisplayMetrics.DENSITY_LOW :
                zoomDensity = WebSettings.ZoomDensity.CLOSE;
                break ;
            case  DisplayMetrics.DENSITY_MEDIUM :
                zoomDensity = WebSettings.ZoomDensity.MEDIUM;
                break ;
            case  DisplayMetrics.DENSITY_HIGH :
                zoomDensity = WebSettings.ZoomDensity.FAR;
                break ;
        }
        webSettings.setDefaultZoom(zoomDensity) ;
        webView.setInitialScale(100);
        webView.loadData(agreement,"text/html; charset=UTF-8", null);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.back:
                setResult(RESULT_CANCELED);
                finish();
                break;
            default:
                break;
        }

    }
    /**
     * 键盘回退
     */
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if(keyCode==KeyEvent.KEYCODE_BACK){
            setResult(RESULT_CANCELED);
            this.finish();
        }
        return false;
    }
}
