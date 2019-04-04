import {WxcDialog} from 'weex-ui';
import {appendElementToView} from "common_weex/src/dom/WeexDOM";


interface ShowDialogProps {

    show?: boolean;

    single?: boolean;

    title: string;

    content: string;

    top?: number;

    cancelText?: string;

    confirmText?: string;

    mainBtnColor?: string;

    secondBtnColor?: string;

    showNoPrompt?: boolean;

    noPromptText?: string,

    isChecked?: string;
}

export const showDialog = (props: ShowDialogProps) => {


    appendElementToView({
        component: WxcDialog,
        props
    })

};