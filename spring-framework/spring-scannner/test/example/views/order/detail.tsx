import * as React from "react";
import {ReactViewMapping} from "fengwuxp-spring-react/src/route/ReactViewMapping";


interface DetailProps {

}

@ReactViewMapping({
    condition:"member.add"
})
export default class DetailView extends React.Component<DetailProps> {

}