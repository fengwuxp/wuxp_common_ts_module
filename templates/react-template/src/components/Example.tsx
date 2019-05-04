import {useState,useLayoutEffect,useEffect} from "react";


export const Example = () => {

    const [object, setCount] = useState({num: 1});


    return <div>
        <p>click {object.num}</p>
        <button onClick={() => setCount({
            num: object.num + 1
        })}>点击
        </button>
    </div>
};