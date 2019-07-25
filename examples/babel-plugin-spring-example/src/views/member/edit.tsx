import * as React from "react";
import {ReactViewMapping} from "fengwuxp-spring-react/src/route/ReactViewMapping";


interface EditProps {

}

@ReactViewMapping({
    condition:(context)=>{

        return false;
    }
})
export default class EditView extends React.Component<EditProps> {

}