import * as React from "react";
import {ReactViewMapping} from "fengwuxp-spring-react/src/route/ReactViewMapping";


interface InputProps {

}

@ReactViewMapping({
    condition:"member.add"
})
export default class InputView extends React.Component<InputProps> {

}