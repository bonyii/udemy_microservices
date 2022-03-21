export class DatabaseConnectionError {
    reason = 'Cannot connect to database';

    constructor() {
        //super();

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
}
