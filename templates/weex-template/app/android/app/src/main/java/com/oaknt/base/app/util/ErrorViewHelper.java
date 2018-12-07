package com.oaknt.base.app.util;

import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.levin.android.weex.support.WXApplication;
import com.oaknt.base.app.R;


/**
 * 创建者     ky-wrg
 * 创建时间   17/3/12
 * 描述
 * <p/>
 * 更新者     $Author$
 * 更新时间   $Date$
 * 更新描述   ${TODO}
 */
public class ErrorViewHelper {
    public static void addErrorView(ViewGroup contrainer, int drawableId, String msg, String msg2, String btnTitle, String btn2Title, final ActionCallBack callBack) {
        removeErrorView(contrainer);

        LayoutInflater inflater = LayoutInflater.from(WXApplication.application.getApplicationContext());
        View view = inflater.inflate(R.layout.pdj_erro_bar, null);
        view.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        ImageView imageView = (ImageView) view.findViewById(R.id.erroIcon);
        TextView titleView = (TextView) view.findViewById(R.id.title);
        TextView subTitleView = (TextView) view.findViewById(R.id.sub_title);
        Button refBtn = (Button) view.findViewById(R.id.refresh);
        Button locBtn = (Button) view.findViewById(R.id.location);
        imageView.setImageResource(drawableId);
        titleView.setText(msg);
        subTitleView.setText(msg2);
        if (TextUtils.isEmpty(btnTitle))
            refBtn.setVisibility(View.GONE);
        else {
            refBtn.setText(btnTitle);
        }
        if (TextUtils.isEmpty(btn2Title))
            locBtn.setVisibility(View.GONE);
        else {
            locBtn.setText(btn2Title);
        }

        if (callBack == null) {
            refBtn.setVisibility(View.GONE);
            locBtn.setVisibility(View.GONE);
        } else {
            refBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    callBack.clickEventByViewId(v.getId());
                }
            });
            locBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    callBack.clickEventByViewId(v.getId());
                }
            });
        }
        contrainer.addView(view);
        contrainer.setVisibility(View.VISIBLE);
    }

    public static void removeErrorView(ViewGroup contrainer) {
        contrainer.setVisibility(View.GONE);
        contrainer.removeAllViewsInLayout();
        contrainer.removeAllViews();
    }

    public static void addNoServer(ViewGroup contrainer,final ActionCallBack callBack){
        removeErrorView(contrainer);

        LayoutInflater inflater = LayoutInflater.from(WXApplication.application.getApplicationContext());
        View view = inflater.inflate(R.layout.pdj_erro_bar, null);
        view.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        ImageView imageView = (ImageView) view.findViewById(R.id.erroIcon);
        TextView titleView = (TextView) view.findViewById(R.id.title);
        TextView subTitleView = (TextView) view.findViewById(R.id.sub_title);
        Button refBtn = (Button) view.findViewById(R.id.refresh);
        Button locBtn = (Button) view.findViewById(R.id.location);
        imageView.setImageResource(R.drawable.myinfo_no_address);
        titleView.setText("对不起，您所在的位置暂时无法配送");
        subTitleView.setText("");
        refBtn.setText("查看配送范围");
        locBtn.setText("手动选择地址");

        if (callBack == null) {
            refBtn.setVisibility(View.GONE);
            locBtn.setVisibility(View.GONE);
        } else {
            refBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    callBack.clickEventByViewId(v.getId());
                }
            });
            locBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    callBack.clickEventByViewId(v.getId());
                }
            });
        }
        contrainer.addView(view);
        contrainer.setVisibility(View.VISIBLE);
    }

    public interface ActionCallBack {
        public void clickEventByViewId(int viewId);
    }
}
