import * as React from "react";
import {ReactViewMapping} from "fengwuxp-spring-react/src/annotations/ReactViewMapping";
import IndexView from "../index";


interface ListViewProps {

}

@ReactViewMapping({

    parent: IndexView
})
export default class ListView extends React.Component<ListViewProps> {

}