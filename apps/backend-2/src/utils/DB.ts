import mongoose, { ConnectOptions } from "mongoose";

/**
 * =============
 * DB - database
 * =============
 */
export class DB {
    static connect(uri: string, options?: ConnectOptions) {
        return mongoose.connect(uri, options)
    }

    static disconnect() {
        return mongoose.disconnect()
    }
}