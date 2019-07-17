// import {FormComponentProps} from "antd/lib/form/Form";
import {ReduxRouterProps} from "fengwuxp_common_redux/src/props/ReduxRouterProps";
import {WrappedFormUtils} from "../../types/rc-form";

export interface FormComponentProps {
    form: WrappedFormUtils;
}

/**
 * antd from
 * 通过 from.create创建的组件会注入该props
 */
export interface AntdFromBaseProps extends ReduxRouterProps, FormComponentProps {

}
