package com.oaknt.base.app.ui;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.text.Spannable;
import android.text.SpannableStringBuilder;
import android.text.TextUtils;
import android.text.style.ForegroundColorSpan;
import android.view.KeyEvent;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.baidu.mapapi.map.BaiduMap;
import com.baidu.mapapi.map.BitmapDescriptor;
import com.baidu.mapapi.map.BitmapDescriptorFactory;
import com.baidu.mapapi.map.InfoWindow;
import com.baidu.mapapi.map.MapStatus;
import com.baidu.mapapi.map.MapStatusUpdate;
import com.baidu.mapapi.map.MapStatusUpdateFactory;
import com.baidu.mapapi.map.MapView;
import com.baidu.mapapi.map.Marker;
import com.baidu.mapapi.map.MarkerOptions;
import com.baidu.mapapi.map.OverlayOptions;
import com.baidu.mapapi.map.Polyline;
import com.baidu.mapapi.map.PolylineOptions;
import com.baidu.mapapi.model.LatLng;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.oaknt.base.app.R;
import com.oaknt.base.app.util.ErrorViewHelper;

import org.androidannotations.annotations.AfterViews;
import org.androidannotations.annotations.Click;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.ViewById;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 创建者     ky-wrg
 * 创建时间   17/5/13
 * 描述      运输轨迹
 * <p/>
 * 更新者     $Author$
 * 更新时间   $Date$
 * 更新描述   ${TODO}
 */
@EActivity(R.layout.activity_tracing_map)
public class TracingActivity extends AbsFragmentActivity {
    @ViewById(R.id.txtTitle)
    TextView tvTitle;
    @ViewById(R.id.track_start)
    TextView tvTrackStart;
    @ViewById(R.id.track_start_time)
    TextView tvTrackStartTime;
    @ViewById(R.id.track_end)
    TextView tvTrackEnd;
    @ViewById(R.id.track_end_time)
    TextView tvTrackEndTime;
    @ViewById(R.id.bmapsView)
    MapView mMapView;
    @ViewById(R.id.hintView)
    RelativeLayout hintView;

    BaiduMap mBaiduMap = null;
    Polyline mPolyline = null;

    //地图中显示信息窗口
    InfoWindow mInfoWindow;
    private List<LatLng> stepList=new ArrayList<>();
    private String startAddr,startTime, endAddr,endTime;
    private List<String> tracks;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent intent = this.getIntent();
        if (intent != null) {
            String s = intent.getStringExtra("json");
            if (!TextUtils.isEmpty(s)) {
                try {
                    Gson gson = new Gson();
                    Map<String,Object> map = gson.fromJson(s, new TypeToken<Map<String,Object>>() {
                    }.getType());
                    if (map!=null){
                        if (map.containsKey("startPlace")){
                            startAddr=(String)map.get("startPlace");
                        }
                        if (map.containsKey("startTime")){
                            startTime=(String)map.get("startTime");
                        }
                        if (map.containsKey("endPlace")){
                            endAddr=(String)map.get("endPlace");
                        }
                        if (map.containsKey("endTime")){
                            endTime=(String)map.get("endTime");
                        }
                        if (map.containsKey("lbs")){
                            tracks=(List<String>) map.get("lbs");
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }

    @AfterViews
    void initViews() {
        initStatusBarView();
        tvTitle.setText("运输轨迹");

        if (tracks==null || tracks.size()==0){
            errorData();
        }else{
            tvTrackStart.setText(startAddr);
            tvTrackEnd.setText(endAddr);


            //ForegroundColorSpan 为文字前景色，BackgroundColorSpan为文字背景色
            ForegroundColorSpan graySpan = new ForegroundColorSpan(Color.DKGRAY);
            ForegroundColorSpan greeSpan = new ForegroundColorSpan(getResources().getColor(R.color.colorPrimary));
            if (TextUtils.isEmpty(startTime)){
                tvTrackStartTime.setText("出车");
            }else {
                String s = "出车 " + startTime;
                SpannableStringBuilder builder = new SpannableStringBuilder(s);

                builder.setSpan(graySpan, 0, 2, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
                builder.setSpan(greeSpan, 3, s.length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
                tvTrackStartTime.setText(builder);
            }

            if (TextUtils.isEmpty(endTime)){
                tvTrackEndTime.setText("到达");
            }else {
                String s = endTime + " 到达";
                SpannableStringBuilder builder = new SpannableStringBuilder(s);
                builder.setSpan(greeSpan, 0, endTime.length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
                builder.setSpan(graySpan, endTime.length() + 1, s.length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
                tvTrackEndTime.setText(builder);
            }

            mMapView.showZoomControls(false);
            mBaiduMap = mMapView.getMap();
            MapStatusUpdate msu = MapStatusUpdateFactory.zoomTo(14.0f);
            mBaiduMap.setMapStatus(msu);

            try {
                double lanSum = 0;
                double lonSum = 0;
                LatLng latlng=null;
                String[] lbs = null;
                for (int i = 0; i < tracks.size(); i++) {
                    lbs = tracks.get(i).split(",");
                    latlng = new LatLng(Double.parseDouble(lbs[1]),Double.parseDouble(lbs[0]));
                    stepList.add(latlng);

                    lanSum += latlng.latitude;
                    lonSum += latlng.longitude;
                }
                //设置地图的缩放中心点为所有点的几何中心点
                LatLng target = new LatLng(lanSum/stepList.size(), lonSum/stepList.size());
                //设置缩放中点LatLng target，和缩放比例
                MapStatus.Builder builder = new MapStatus.Builder();
                builder.target(target).zoom(14f);
                //地图设置缩放状态
                mBaiduMap.animateMapStatus(MapStatusUpdateFactory.newMapStatus(builder.build()));

                /**
                 * 配置线段图层参数类： PolylineOptions
                 * ooPolyline.width(13)：线宽
                 * ooPolyline.color(0xAAFF0000)：线条颜色红色
                 * ooPolyline.points(latLngs)：List<LatLng> latLngs位置点，将相邻点与点连成线就成了轨迹了
                 */
                OverlayOptions ooPolyline = new PolylineOptions().width(8).color(0xAAFF0000).points(stepList);

                //在地图上画出线条图层，mPolyline：线条图层
                mPolyline = (Polyline) mBaiduMap.addOverlay(ooPolyline);
                mPolyline.setZIndex(3);

                //始点图层图标
                BitmapDescriptor startBD= BitmapDescriptorFactory
                        .fromResource(R.drawable.ic_me_history_startpoint);
                //终点图层图标
                BitmapDescriptor finishBD= BitmapDescriptorFactory
                        .fromResource(R.drawable.ic_me_history_finishpoint);

                MarkerOptions oStart = new MarkerOptions();//地图标记类型的图层参数配置类
                oStart.position(stepList.get(0));//图层位置点，第一个点为起点
                oStart.icon(startBD);//设置图层图片
                oStart.zIndex(1);//设置图层Index
                //添加起点图层
                final Marker mMarkerA = (Marker) (mBaiduMap.addOverlay(oStart));

                //添加终点图层
                MarkerOptions oFinish = new MarkerOptions().position(stepList.get(stepList.size()-1))
                        .icon(finishBD).zIndex(2);
                final Marker mMarkerB = (Marker) (mBaiduMap.addOverlay(oFinish));

                //设置图层点击监听回调
//                mBaiduMap.setOnMarkerClickListener(new BaiduMap.OnMarkerClickListener() {
//                    public boolean onMarkerClick(final Marker marker) {
//                        if (marker.getZIndex() == mMarkerA.getZIndex() ) {//如果是起始点图层
//                            TextView textView = new TextView(getApplicationContext());
//                            textView.setText(startAddr);
//                            textView.setTextColor(Color.BLACK);
//                            textView.setGravity(Gravity.CENTER);
//                            textView.setBackgroundResource(R.drawable.popup);
//
//                            //设置信息窗口点击回调
//                            InfoWindow.OnInfoWindowClickListener listener = new InfoWindow.OnInfoWindowClickListener() {
//                                public void onInfoWindowClick() {
//                                    //这里是主线线程，可以实现自己的一些功能
//                                    Toast.makeText(getApplicationContext(),"这里是起点", Toast.LENGTH_SHORT).show();
//                                    mBaiduMap.hideInfoWindow();//隐藏信息窗口
//                                }
//                            };
//
//                            LatLng latLng = marker.getPosition();//信息窗口显示的位置点
//
//                            /**
//                             * 通过传入的 bitmap descriptor 构造一个 InfoWindow
//                             * bd - 展示的bitmap
//                             position - InfoWindow显示的位置点
//                             yOffset - 信息窗口会与图层图标重叠，设置Y轴偏移量可以解决
//                             listener - 点击监听者
//
//                             另外，Projection类可以将地理坐标和屏幕坐标进行相互转换。
//                             Point point = mBaiduMap.getProjection().toScreenLocation(latLng)是
//                             将地理坐标转换为屏幕上的坐标，其中point.y是地理位置点相对于MapView左上角的y轴坐标。
//                             这里就可以将mInfoWindow放在你指定的y轴位置了，
//                             如果将InfoWindow第三个参数设置为mMapView.getHeight()-point.y，
//                             那么mInfoWindow是不是就放着屏幕底部了呢，哈哈。注意mMapView.getHeight()的取值时机。
//                             */
//                            mInfoWindow = new InfoWindow(BitmapDescriptorFactory.fromView(textView), latLng, -47, listener);
//                            mBaiduMap.showInfoWindow(mInfoWindow);//显示信息窗口
//                        } else if (marker.getZIndex() == mMarkerB.getZIndex()) {//如果是终点图层
//                            Button button = new Button(getApplicationContext());
//                            button.setText("终点");
//                            button.setOnClickListener(new View.OnClickListener() {
//                                public void onClick(View v) {
//                                    Toast.makeText(getApplicationContext(),"这里是终点", Toast.LENGTH_SHORT).show();
//                                    mBaiduMap.hideInfoWindow();
//                                }
//                            });
//
//                            LatLng latLng = marker.getPosition();
//                            /**
//                             * 通过传入的 view 构造一个 InfoWindow, 此时只是利用该view生成一个Bitmap绘制在地图中，监听事件由自己实现。
//                             view - 展示的 view
//                             position - 显示的地理位置
//                             yOffset - Y轴偏移量
//                             */
//                            mInfoWindow = new InfoWindow(button, latLng, -47);
//                            mBaiduMap.showInfoWindow(mInfoWindow);
//                        }
//                        return true;
//                    }
//                });
//
//                //也可以给运动轨迹添加点击事件
//                mBaiduMap.setOnPolylineClickListener(new BaiduMap.OnPolylineClickListener() {
//                    @Override
//                    public boolean onPolylineClick(Polyline polyline) {
//                        if (polyline.getZIndex() == mPolyline.getZIndex()) {
//                            Toast.makeText(getApplicationContext(),"点数：" + polyline.getPoints().size() + ",width:"
//                                    + polyline.getWidth(), Toast.LENGTH_SHORT).show();
//                        }
//                        return false;
//                    }
//                });
            }catch (Exception e){
                e.printStackTrace();
                errorData();
            }
        }
    }

    private void errorData(){
        ErrorViewHelper.addErrorView(hintView, R.drawable.icon_no_data, "暂无数据", "", "", "", null);
    }

    @Click(R.id.back)
    void onBack() {
        finish();
    }

    @Override
    protected void onPause() {
        mMapView.onPause();
        super.onPause();
    }

    @Override
    protected void onResume() {
        mMapView.onResume();
        super.onResume();
    }

    @Override
    protected void onDestroy() {
        mMapView.onDestroy();
        super.onDestroy();
    }

    /**
     * 键盘回退
     */
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            onBack();
        }
        return false;
    }
}
