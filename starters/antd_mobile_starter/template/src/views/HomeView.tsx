import * as  React from "react";
import {Flex, Modal, Toast, WingBlank, Carousel, NoticeBar} from "antd-mobile";
import {connect, MapStateToPropsParam} from "react-redux";
import {AntdMobileStore} from "../store/AntdMobileStore";
import AntdAbstractView, {
    AntdAbstractViewProps,
    AntdAbstractViewState
} from "antd_mobile_starter/src/layouts/view/AntdAbstractView";
import classNames from "classnames"
import styles from "./style.module.less";
import utilLess from "antd_mobile_starter/src/less/utils.module.less";
import fontLess from "antd_mobile_starter/src/less/font.module.less";
import {indexRouteName} from "./index";
import iconGameIcon from "../assert/images/home/icon-game.png";
import iconActivityIcon from "../assert/images/home/icon-activity.png";


export interface HomeViewProps extends AntdAbstractViewProps {

    /**
     * 轮播图
     */
    slideList?: string[];

    /**
     * 公告文本
     */
    noticeText?: string[]

}

interface HomeViewState extends AntdAbstractViewState {


}

const mapStateToPropsParam: MapStateToPropsParam<any, HomeViewProps, AntdMobileStore> = ({homeProps}) => ({...homeProps});


/**
 * 首页
 */
@(connect as any)(mapStateToPropsParam)
export default class HomeView extends AntdAbstractView<HomeViewProps, HomeViewState> {


    constructor(props: any, context: any) {
        super(props, context);
    }


    state: HomeViewState = {};

    componentDidMount() {

    }


    renderHeader = () => {

        return <Flex className={classNames(styles.home_bar)}>
            <img className={styles.logo} src={""}/>
            <Flex className={utilLess.flex_cell} justify={"end"} align={"center"}>
                <a onClick={() => this.to(indexRouteName.login)} className={styles.moon_button}>登录</a>
                <a onClick={() => this.to(indexRouteName.register)} className={styles.moon_button}>注册</a>
                <a className={styles.moon_button}>试玩</a>
            </Flex>
        </Flex>
    };


    renderBody = () => {

        const {slideList, noticeText} = this.props;


        return <section className={utilLess.view_body_scroll}>
            {
                slideList.length == 0 ? null :
                    <Carousel className={styles.slider_content}>
                        {
                            slideList.map((item) => <img className={classNames(utilLess.w_100, utilLess.h_100)}
                                                         src={item}/>)

                        }
                    </Carousel>

            }
            {
                noticeText.length == 0 ? null : <NoticeBar
                    style={{
                        backgroundColor: "rgba(255,255,255,.5)",
                        color: "#303030",
                        fontSize: 16
                    }}
                    marqueeProps={{
                        loop: true,
                        text: noticeText.join(" "),
                        style: {
                            padding: '0 7.5px',
                            color: "#303030"
                        }
                    }}/>
            }
            <Flex className={classNames(utilLess.padding_lr_lg)}>
                <img src={iconGameIcon} style={{width: 21}}/>
                <h5 className={classNames(utilLess.margin_lr_lg, fontLess.font_size_16)}>热门游戏</h5>
            </Flex>
            {
                this.renderGameList()
            }
            <Flex className={classNames(utilLess.padding_lg)}>
                <img src={iconActivityIcon} style={{width: 21}}/>
                <h5 className={classNames(utilLess.margin_lr_lg,utilLess.flex_cell, fontLess.font_size_16)}>优惠活动</h5>
                <a style={{textDecorationLine:"underline"}} onClick={() => {

                }}>更多>></a>
            </Flex>
            {
                <ul className={classNames(styles.home_activity_list)}>
                    <li className={classNames(styles.home_activity_item)}>
                        <h5 className={classNames(fontLess.font_size_16)}>擦擦擦</h5>
                        <img/>
                    </li>
                </ul>
            }
        </section>
    };


    /**
     * 渲染游戏列表
     */
    private renderGameList = () => {

        return <ul className={classNames(utilLess.d_flex, styles.home_game_list)}>
            <li>
               <div className={classNames( styles.home_game_item)}>
                   <img/>
                   <div className={classNames(utilLess.margin_top_md, fontLess.font_weight_500)}>测是1</div>
               </div>
            </li>
            <li>
                <div className={classNames( styles.home_game_item)}>
                    <img/>
                    <div className={classNames(utilLess.margin_top_md, fontLess.font_weight_500)}>测是1</div>
                </div>
            </li>
            <li>
                <div className={classNames( styles.home_game_item)}>
                    <img/>
                    <div className={classNames(utilLess.margin_top_md, fontLess.font_weight_500)}>测是1</div>
                </div>
            </li>
            <li>
                <div className={classNames( styles.home_game_item)}>
                    <img/>
                    <div className={classNames(utilLess.margin_top_md, fontLess.font_weight_500)}>测是1</div>
                </div>
            </li>
            <li>
                <div className={classNames( styles.home_game_item)}>
                    <img/>
                    <div className={classNames(utilLess.margin_top_md, fontLess.font_weight_500)}>测是1</div>
                </div>
            </li>

        </ul>
    }
}