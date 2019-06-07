import * as React from "react";
import {ReactView} from "typescript-spring-react/src/route/ReactView";


interface InputProps {

}

@ReactView({
    condition:"member.add"
})
export default class InputView extends React.Component<InputProps> {

}