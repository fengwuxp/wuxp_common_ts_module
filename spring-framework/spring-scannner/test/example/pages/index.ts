

import * as React from "react";
import {ReactViewMapping} from "fengwuxp-spring-react/src/route/ReactViewMapping";


interface IndexViewProps {

}

@ReactViewMapping({
    condition:"member.add",
    exact: false,
    strict: false
})
export default class IndexView extends React.Component<IndexViewProps> {

}