export enum TicketType {

    background = "background",
    foreground = "foreground"
}

/**
 * 打印机的抽象
 */
export interface Printer {

    /**
     * 获取打印机列表
     */
    callGetLocalPrinterList: () => Promise<any>;

    /**
     * 设置打印机
     * @param type
     * @param printers
     */
    callSetPrinter: (type: TicketType, printers: any) => void;

    /**
     * 打印
     * @param type
     * @param data
     */
    callPrintTicket: (type: TicketType, data: any) => Promise<any>;
}
