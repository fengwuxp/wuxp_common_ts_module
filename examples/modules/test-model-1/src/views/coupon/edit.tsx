import * as React from "react";
import {ReactViewMapping} from "fengwuxp-spring-react/src/annotations/ReactViewMapping";
import HomeIndexView from "../index";


interface EditProps {

}

@ReactViewMapping({
    condition: (context) => {

        return false;
    },
    parent: HomeIndexView
})
export default class EditView extends React.Component<EditProps> {

}