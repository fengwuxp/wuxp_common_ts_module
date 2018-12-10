package com.oaknt.base.app.ui;

import android.graphics.Bitmap;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.GeolocationPermissions;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.oaknt.base.app.R;
import com.oaknt.base.app.util.Strings;

import org.androidannotations.annotations.AfterViews;
import org.androidannotations.annotations.Click;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.ViewById;

/**
 * 创建者     ky-wrg
 * 创建时间   17/5/4
 * 描述         ${TODO}
 * <p/>
 * 更新者     $Author$
 * 更新时间   $Date$
 * 更新描述   ${TODO}
 */
@EActivity(R.layout.activity_web)
public class WebActivity extends AbsFragmentActivity {
    @ViewById(R.id.tv_webview_back)
    TextView tvBack;
    @ViewById(R.id.back)
    ImageView ivBack;
    @ViewById(R.id.tv_webview_close)
    TextView tvClose;
    @ViewById(R.id.txtTitle)
    TextView tvTitle;
    @ViewById(R.id.activity_webview_web)
    WebView webView;
    @ViewById(R.id.activity_webview_progress)
    ProgressBar progressBar;
    @ViewById(R.id.menu)
    ImageButton ivMenu;

    private String title, url;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @AfterViews
    void initViews() {

        ivBack.setVisibility(View.GONE);
        tvBack.setVisibility(View.VISIBLE);
        tvClose.setVisibility(View.VISIBLE);
        ivMenu.setImageResource(R.drawable.toolbar_refresh_seletor);
        ivMenu.setVisibility(View.VISIBLE);

        if (getIntent() != null) {
            title = getIntent().getStringExtra("title");
            url = getIntent().getStringExtra("url");
            if (TextUtils.isEmpty(url)) {
                finish();
                return;
            }
        }

        tvTitle.setText(title);
        WebSettings d = webView.getSettings();
        d.setJavaScriptEnabled(true);
        d.setCacheMode(WebSettings.LOAD_NO_CACHE);
        d.setBuiltInZoomControls(false);
        webView.setVerticalScrollBarEnabled(false);
        webView.setWebViewClient(webViewClient);
        webView.setWebChromeClient(webChromeClient);
        webView.loadUrl(url);
    }




    @Click(R.id.tv_webview_back)
    void onBack() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            finish();
        }
    }

    @Click(R.id.tv_webview_close)
    void onClose() {
        finish();
    }

    @Click(R.id.menu)
    void onRefresh() {
        webView.reload();
    }

    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            onBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    private WebChromeClient webChromeClient = new WebChromeClient() {
        public void onGeolocationPermissionsHidePrompt() {
            super.onGeolocationPermissionsHidePrompt();
        }

        public void onGeolocationPermissionsShowPrompt(String paramAnonymousString, GeolocationPermissions.Callback paramAnonymousCallback) {
            paramAnonymousCallback.invoke(paramAnonymousString, true, false);
        }

        public void onProgressChanged(WebView paramAnonymousWebView, int paramAnonymousInt) {
            if (paramAnonymousInt == 100) {
                progressBar.setVisibility(View.GONE);
            } else {
                progressBar.setProgress(paramAnonymousInt);
                if (progressBar.getVisibility() == View.GONE) {
                    progressBar.setVisibility(View.VISIBLE);
                }
            }
            super.onProgressChanged(paramAnonymousWebView, paramAnonymousInt);
        }

        public void onReceivedTitle(WebView paramAnonymousWebView, String paramAnonymousString) {
            if (Strings.isNullOrEmpty(title))
                tvTitle.setText(paramAnonymousString);
            super.onReceivedTitle(paramAnonymousWebView, paramAnonymousString);
        }
    };
    private WebViewClient webViewClient = new WebViewClient() {

        public void onPageFinished(WebView paramWebView, String paramString) {
            super.onPageFinished(paramWebView, paramString);
        }

        public void onPageStarted(WebView paramWebView, String paramString, Bitmap paramBitmap) {
            super.onPageStarted(paramWebView, paramString, paramBitmap);
        }

        public void onReceivedError(WebView paramWebView, int paramInt, String paramString1, String paramString2) {
        }

        public boolean shouldOverrideUrlLoading(WebView paramWebView, String paramString) {
            paramWebView.loadUrl(paramString);
            return true;
        }
    };
}
