import {IConfig, IPlugin} from 'umi-types';
import slash from 'slash2';
import defaultSettings from './defaultSettings';
import themePluginConfig from './themePluginConfig';
import * as path from 'path';
import CopyWebpackPlugin from "copy-webpack-plugin";
// const CopyWebpackPlugin = require("copy-webpack-plugin");

const plugins: IPlugin[] = [
  // ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: {
        importDirectory: "es"
      },
      // dva: {
      //   hmr: true,
      // },
      // locale: {
      //   // default false
      //   enable: false,
      //   // default zh-CN
      //   default: 'zh-CN',
      //   // default true, when it is true, will use `navigator.language` overwrite default
      //   baseNavigator: true,
      // },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
  [
    "umi-plugin-antd-theme",
    themePluginConfig
  ]
];

// plugins.push(['umi-plugin-antd-theme', themePluginConfig]);

export default {
  plugins,
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: false,
  targets: {
    ie: 11,
  },
  theme: {
    '@primary-color': defaultSettings.primaryColor,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          // path: 'https://github.com/ant-design/ant-design-pro-layout/issues',
          name: 'site',
          icon: require(`@ant-design/icons-svg/lib/asn/AccountBookOutlined`).default,
          path: "/",
          target: '_blank',
          component: './Welcome',
        },
        {
          name: 'flex 布局测试',
          // icon: require(`@ant-design/icons-svg/lib/asn/AlertFilled`).default,
          icon: '/static_resources/svg/alert.svg',
          path: 'flex',
          component: './FlexDemo',
        },
        {
          name: '测试',
          icon: require(`@ant-design/icons-svg/lib/asn/AimOutlined`).default,
          path: '/example',
          component: './example',
        }
      ],
    },
  ],
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less') ||
        !context.resourcePath.includes('example')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  alias: {
    'static': path.resolve(__dirname, '../static/')
  },
  // publicPath: "/static_resources/",
  // externals: {
  //   "react": "window.React",
  //   "react-dom": "window.ReactDOM"
  // },
  extraBabelPlugins: [
    [
      "import",
      {
        "libraryName": "@ant-design/icons",
        "libraryDirectory": "",
        "style": false,
        camel2DashComponentName: false
      },
      "@ant-design/icons"
    ]
  ],
  chainWebpack: function (config, {webpack}) {

    // console.log("--from-->", path.resolve(__dirname, "../src/assets/svg/"));
    // console.log("--to-->", path.resolve(__dirname, `../dist/static/svg/`));
    config.plugin("copy-static-resources").use(CopyWebpackPlugin, [
      [
        {
          from: path.resolve(__dirname, "../src/assets/svg/"),
          to: path.resolve(__dirname, `../dist/static/svg/`)
        },
      ]
    ]);

  },
  treeShaking: false
} as IConfig;
