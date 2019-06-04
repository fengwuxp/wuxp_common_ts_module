import {Bean} from "../../src/annotations/Bean";


class TestConfiguration {


    @Bean()
    public memberService = (memberProvider) => {

    };

    @Bean()
    public memberProvider = () => {

    }
}