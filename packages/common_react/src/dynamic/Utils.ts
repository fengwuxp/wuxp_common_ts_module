import ReactDOM from "react-dom";

/**
 * 卸载组件
 * @author wxup
 * @create 2018-09-09 22:04
 **/
export function unMountComponentByNode(container) {
    const unmountResult = ReactDOM.unmountComponentAtNode(container);
    const parentNode = container.parentNode;
    if (unmountResult && parentNode) {
        parentNode.removeChild(container);
    }
}
