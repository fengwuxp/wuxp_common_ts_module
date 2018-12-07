import WeexIcon from "./weex-icon";

/**
 * weex icon
 *
 * @author wxup
 * @create 2018-10-10 11:38
 **/
export default {
    components: {
        WeexIcon
    },
    props: {
        name: {
            default: null,
            type: String
        },
        size: {
            default: null,
            type: Number
        },
        color: {
            default: null,
            type: String
        },
        classNames: {
            default: null,
            type: String
        },
        iconStyle: {
            default: null
        }
    },
    data() {
        return {
            fontFamily: null,
            glyphMap: null
        }
    },
    methods: {
        iconClicked(data) {
            this.$emit('iconClicked', data);
        }
    }
}
