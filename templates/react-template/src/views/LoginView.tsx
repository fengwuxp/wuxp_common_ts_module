import {ReactRouteView} from "fengwuxp_common_state/src/annotations/ReactRouteView";
import * as React from "react";
import {HomeViewProps} from "./HomeView";
import {stringify} from "querystring";

@ReactRouteView({
    pathname: "login"
})
export default class LoginView extends React.Component<{}, {}> {


    constructor(props: Readonly<HomeViewProps>) {
        super(props);
    }

    render() {

        return <div>
            <button onClick={this.login}>登陆</button>
        </div>
    }

    login = () => {

        const data = {
            userName: "test",
            password: "123456"
        };

        fetch("http://localhost:9018/api/login", {
            method: "post",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
            body: stringify(data)
        }).then((resp) => {
            console.log(resp)
        })

    }
}
