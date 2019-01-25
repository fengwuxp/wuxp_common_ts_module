
##### flex-view


              <!-- flex view -->
              <template>
                  <flex-view>
                      <nav-bar slot="app-header"></nav-bar>
                      <div slot="app-body" style="flex:1;"></div>
                      <div slot="app-footer" style="flex: 200px;"></div>
                  </flex-view>
              </template>

              <script>
                  import FlexView from "../../src/layout/view/flex-view";
                  import NavBar from "../../src/layout/navbar/nav-bar";

                  export default {
                      name: "flex-view",
                      components: {
                          NavBar,
                          FlexView
                      },
                      data() {
                          return {};
                      },
                      methods: {}
                  }
              </script>

              <style scoped lang="less">

              </style>