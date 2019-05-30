/// <reference path="../node_modules/@types/react/index.d.ts" />

declare namespace React {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {

        testAttr?: string;
    }
}