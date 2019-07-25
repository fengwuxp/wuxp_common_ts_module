import * as React from "react";
import {ReactViewMapping} from "fengwuxp-spring-react/src/route/ReactViewMapping";
import IndexView from "../index";


interface EditProps {

}

@ReactViewMapping({
    condition:(context)=>{

        return false;
    },
    parent: IndexView
})
export default class EditView extends React.Component<EditProps> {

}