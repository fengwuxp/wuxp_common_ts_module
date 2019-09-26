export interface SpringApplication {


    run: (...args) => void;

    onStart: (context: SpringApplication) => void;

    onDestroy: () => void;
}
