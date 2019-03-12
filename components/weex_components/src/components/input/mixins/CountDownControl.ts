/*
* 倒计时控制
* */
export default {

    props: {

        times: {
            default: 60
        },
        /**
         * 获取验证码的方法
         */
        getPhoneCodeFn: {
            default: null
        },
        buttonStyle: {
            default: {
                width: "240px",
                height: "80px",
                borderRadius: "20px",
                disabledBackgroundColor: "#c9c9c9",
                backgroundColor: "#32A5FF"
            }
        },
        buttonTextStyle: {
            default: {
                fontSize: "32px",
                color: "#ffffff"
            }
        }
    },
    data() {
        return {
            countDownTimes: parseInt(this.times),
            //获取的次数
            getCount: 0,
            buttonIsLock: false
        }
    },
    computed: {
        showButtonText() {
            if (this.getCount === 0) {
                if (!this.isCountDowning) {
                    return "获取验证码"
                }
            } else {
                if (!this.isCountDowning) {
                    return "重新获取"
                }
            }
            return `${this.countDownTimes}秒后重新获取`;
        },
        rightButtonStyle() {
            const style = {...this.buttonStyle};
            if (this.isCountDowning) {
                //在倒计时状态
                style.backgroundColor = style.disabledBackgroundColor;
            }
            delete style.disabledBackgroundColor;
            return style
        },
        isCountDowning() {
            return this.countDownTimes < this.times;
        }
    },
    methods: {

        onButtonClick(event) {
            if (this.buttonIsLock) {
                return;
            }
            this.buttonIsLock = true;
            if (this.countDownTimes != this.times) {
                return;
            }
            if (typeof this.getPhoneCodeFn === "function") {
                this.getPhoneCodeFn().then(() => {
                    this.countDown();
                }).finally(()=>{
                    this.buttonIsLock = false;
                });
            }
        },
        countDown() {
            setTimeout(() => {
                if (this.countDownTimes === 0) {
                    this.getCount++;
                    this.countDownTimes = this.times;
                } else {
                    this.countDownTimes--;
                    this.countDown();
                }
            }, 998);
        }
    }
}