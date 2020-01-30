

module.exports = {

  plugins:[
    [
      "import",
      {
        "libraryName": "@ant-design/icons",
        "libraryDirectory": "",
        "style": false,
        camel2DashComponentName: false
      },
      "@ant-design/icons"
    ],

    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": false,
        camel2DashComponentName: false
      },
      "antd"
    ],
  ]
};
