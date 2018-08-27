import {ComponentBuilder} from "../ComponentBuilder";


export interface FormItemBuilder<T> extends ComponentBuilder<T>{


    verify:(...args)=>this;



}


// builder.name(Input).verify()
//     .props({}).build();