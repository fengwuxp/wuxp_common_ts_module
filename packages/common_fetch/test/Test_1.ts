const Test = (): Function => {

    return function (target: any, name: string, descriptor: PropertyDescriptor) {

        // target.a = 1;
        // const {} = target;
        return class extends target {
            a: number = 1;
        }
    }
};

@Test()
export class A {


}


export class A1 extends A {
    b: number;
}

//let NewAaa=Test(A)
