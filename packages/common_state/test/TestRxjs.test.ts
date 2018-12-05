import {EMPTY} from "rxjs";


describe("test", () => {

    it("12", () => {
        EMPTY.subscribe(
            (x) => console.log("next", x),
            (x) => console.log("error", x),
            () => {
                console.log("complete")
            },
        );
    })
});