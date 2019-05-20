/**
 *  tab header propss
 * @author wxup
 * @create 2018-11-15 10:50
 **/

export default {
    tabTitles: {
        type: Array,
        default: () => ([])
    },
    tabStyles: {
        default: () => ({
            bgColor: '#FFFFFF',
            tabWrapperBorderColor: "#e6e6e6",
            titleColor: '#666666',
            activeTitleColor: '#3D3D3D',
            activeBgColor: '#FFFFFF',
            isActiveTitleBold: true,
            iconWidth: 70,
            iconHeight: 70,
            width: 160,
            height: 120,
            fontSize: 24,
            hasActiveBottom: true,
            activeBottomColor: '#FFC900',
            activeBottomWidth: 120,
            activeBottomHeight: 6,
            textPaddingLeft: 10,
            textPaddingRight: 10,
            leftOffset: 0,
        })
    },
    titleType: {
        type: String,
        default: 'icon'
    },
    titleUseSlot: {
        default: false
    },
    defaultIndex: {
        default: 0
    },
    startScrollIndex:{
        default: 10
    },
}
