import * as React from "react";
import {ReactViewMapping} from "fengwuxp-spring-react/src/annoations/ReactViewMapping";


@ReactViewMapping({
    condition:(context)=>{

        return false;
    }
})
export default class HomeIndexView extends React.Component<{},{}> {

}