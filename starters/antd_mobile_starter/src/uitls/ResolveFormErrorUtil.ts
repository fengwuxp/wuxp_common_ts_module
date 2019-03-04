

interface FormError {

    readonly [key: string]: {
        readonly   errors: Array<{
            readonly field: string,
            readonly message: string
        }>
    }
}

/**
 * 解析表单验证失败的错误信息
 * @param {FormError} error
 * @return {string}
 */
export function resolveFormErrorMessage(error: FormError): string {

    const key = Object.keys(error)[0];
    return error[key].errors[0].message
}

