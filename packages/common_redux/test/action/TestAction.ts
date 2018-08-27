import {ReducerHandler} from "../../src/reducer/ReducerHandler";


export default class TestAction implements ReducerHandler<any> {


    defaultState: any = {};

    setProps<K extends keyof any>(newState: any, state?: any): void {
    }


    constructorName: string;


    //从远程获取数据，并更新到state中
    fetchUserList = () => {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                resolve([]);
            }, 1600)
        }).then((data)=>{

            //pushUser(data);

            return data;
        })

    };

    //从本地获取数据，更新到state中
    updateLocalUserInfo = (user) => {

        // let state = this.context.getState(this.testReducerHolder);


        //update
        // state.users[index] = user;

        //auto call this.setReducerHolder.setUserList

    }

}