export interface ConfirmationDialog {
    title: string,
    content: string,
    confirmationBtnName: string,
    handler: (...args: any) => void
}