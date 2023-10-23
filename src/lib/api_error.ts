enum METHOD {
    GET,
    POST,
    PUT,
    PATCH,
    DELETE,
    OPTION,
    CONNECT,
    HEAD,
}

class APIError extends Error {
    public method: METHOD
    public path: string
    public type: string
    constructor(message: string, path: string, method: METHOD, type: string) {
        super(message)
        this.method = method
        this.path = path
        this.type = type
    }
    //TODO create a logger
}

export default APIError;