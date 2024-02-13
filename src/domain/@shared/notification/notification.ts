export type NotificationError = {
    message: string;
    context: string;
}

export default class Notification {
    private errors: NotificationError[] = [];

    public addError(error: NotificationError) {
        this.errors.push(error);
    }

    message(context?: string): string {
        let message = "";
        this.errors.forEach((error) => {
            if (context === undefined || error.context === context) {
                message += `${error.context}: ${error.message},`;

            }
        });

        return message;

    }
}