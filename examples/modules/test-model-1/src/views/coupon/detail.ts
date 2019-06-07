import * as React from "react";
import {ReactView} from "typescript-spring-react/src/route/ReactView";


interface DetailProps {

}

@ReactView({
    condition:"member.add"
})
export default class DetailView extends React.Component<DetailProps> {

}