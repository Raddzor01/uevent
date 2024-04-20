export class ClientError extends Error {
    status

    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

const errorMiddleware = (error, req, res, next) => {
    console.error(error);
    res.status((error).status || 500).json({
        message: error.message || 'A server-side error occurred.',
    });
};

export {errorMiddleware};