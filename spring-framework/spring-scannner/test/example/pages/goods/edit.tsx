import * as React from "react";
import {ReactView} from "fengwuxp-spring-react/src/route/ReactView";


interface EditProps {

}

@ReactView({
    condition:(context)=>{

        return false;
    }
})
export default class EditView extends React.Component<EditProps> {

}