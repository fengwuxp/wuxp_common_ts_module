
#### 布局组件
- flex-view
``` 
    所有页面的根组件，示例如下：
       <flex-view :viewStyle='viewStyle'>
         <div slot='app-header'></div>
         <div slot='app-body'></div>
         <div slot='app-footer'></div>
       </flex-view>
    
    该组件有3个插槽，将页面分为header，body footer3个部分，可以适应各种复杂的情况
    flex-bg-view 组件是有带背景图片的根布局组件。
    该组件适配刘海屏
```
- tab-bar-view
```
  tab-bar-view，客户常见的首页导航页面，该组件用于需要有底部导航的页面（暂不支持顶部导航的方式）
  是用该组件是需要区分原生端和web端2中情况，例子如下：
  
  web端：
  
      <tab-bar-view @pageChange="pageChange"
                  :defaultViewIndex="0"
                  :viewItems="viewItems"
                  itemSelectedColor="#16b356"
                  itemDefaultColor="#989898"
                  ref="index_view">
        <home-view slot="view_0"></home-view>
        <category-view slot="view_1"></category-view>
        <find-view slot="view_2"></find-view>
        <shop-cart-view slot="view_3"></shop-cart-view>
        <member-index-view slot="view_4"></member-index-view>
    </tab-bar-view>
    
   原生端：
      
     <tab-bar-view @pageChange="pageChange"
                  :defaultViewIndex="0"
                  :viewItems="viewItems"
                  itemSelectedColor="#16b356"
                  itemDefaultColor="#989898"
                  ref="index_view">
     </tab-bar-view> 
   原生端依赖 viewItems的配置，其机构如下：
   import {NavItem} from "weex_components/src/layout/tab-bar/props/NavItem";
   import {NavShowType} from "weex_components/src/layout/tab-bar/props/NavShowType";
   import {NavItemType} from "weex_components/src/layout/tab-bar/props/NavItemType";
   import {getWeexResourceUrl} from "fengwuxp_common_weex/src/resources/ResourcePathParser";
 
    const NAV_ITEMS: Array<NavItem> = [
      {
        icon: getWeexResourceUrl("nav/home_icon.png"),
        text: "首页",
        url: getWeexResourceUrl("HomeView.js?isHome=1"),
        showType: NavShowType.DEFAULT,
        targetType: NavItemType.VIEW
    },
    {
        icon: getWeexResourceUrl("nav/pdj_my_category.png"),
        text: "分类",
        url: getWeexResourceUrl("category/CategoryView.js"),
        showType: NavShowType.DEFAULT,
        targetType: NavItemType.VIEW
    },
    {
        icon: getWeexResourceUrl("nav/pdj_find.png"),
        text: "发现",
        url: getWeexResourceUrl("find/FindView.js"),
        showType: NavShowType.DEFAULT,
        targetType: NavItemType.VIEW
    },
    {
        icon: getWeexResourceUrl("nav/pdj_cart.png"),
        text: "购物车",
        url: getWeexResourceUrl("shopcart/ShopCartView.js?backIconUrl="),
        showType: NavShowType.DEFAULT,
        targetType: NavItemType.VIEW
    },

    {
        icon: getWeexResourceUrl("nav/pdj_my.png"),
        text: "我的",
        url: getWeexResourceUrl("member/MemberIndexView.js"),
        showType: NavShowType.DEFAULT,
        targetType: NavItemType.VIEW
    }
  ];
 

```
- nav-bar
```
   页面顶部导航栏，支持沉浸式（需要原生的支持），需要和flex-view组件配合使用
   基础例子：
     <flex-view :viewStyle="viewStyle">
        <nav-bar slot="app-header" :navTitle="navTitle"></nav-bar>
        <div slot="app-body" class="flex_1"></div>
        <div slot="app-footer" class="app_footer"></div>
     </flex-view>

```
- drop-refresh，[组件说明](../src/layout/drop-refresh/README.md)
```
   对weex的 scroller和list组件做了封装，支持下拉刷新和上拉加载，具体的查看组件说明
```
