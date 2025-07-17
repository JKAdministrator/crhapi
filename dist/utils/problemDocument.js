"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_DOCUMENT = void 0;
const http_problem_details_1 = require("http-problem-details");
exports.ERROR_DOCUMENT = {
    NOT_AUTHORIZED: { httpStatusCode: 401, title: 'Not Authorized', detail: 'User not Authorized to access the resource', url: '/not-authorized' }, // no estas autorizado por no tener sesion
    NOT_FOUND: { httpStatusCode: 404, title: 'Not Found', detail: 'The resource does not exists', url: '/not-found' }, // no se encuentra lo que solicitas
    INTERNAL_SERVER_ERROR: { httpStatusCode: 500, title: 'Internal Server Error', detail: 'A problem ocurred on the server. Retry the operation in a few seconds', url: '/internal-server-error' }, // error atrapado, pincho algo en el servidor
    BAD_REQUEST: { httpStatusCode: 400, title: 'Bad Request', detail: 'Missing request obligatory data', url: '/bad-request' }, // alguno de los parametros de input esta mal
};
const createErrorDocument = (errorDocument, extensionObject = null, title = undefined, detail = undefined) => {
    const problem = new http_problem_details_1.ProblemDocument({
        type: `https://example.com/errors${errorDocument.url}`,
        status: errorDocument.httpStatusCode,
        title: title || errorDocument.title,
        detail: detail || errorDocument.detail,
    }, extensionObject ? new http_problem_details_1.ProblemDocumentExtension(extensionObject) : undefined);
    return problem;
};
exports.default = createErrorDocument;
