import { ProblemDocument, ProblemDocumentExtension } from 'http-problem-details';

// obtenemos la url donde esta escuhando el servidor
// import { URL } from 'url';

type ERROR_DOCUMENT_TYPE = {
    [key: string]: {
        httpStatusCode: number,
        url: string,
        title: string,
        detail: string
    }    
}

export const ERROR_DOCUMENT:ERROR_DOCUMENT_TYPE = {
    NOT_AUTHORIZED:             {httpStatusCode: 401, title:'Not Authorized',        detail:'User not Authorized to access the resource',                             url:'/not-authorized'         },           // no estas autorizado por no tener sesion
    NOT_FOUND:                  {httpStatusCode: 404, title:'Not Found',             detail:'The resource does not exists',                                           url:'/not-found'              },                // no se encuentra lo que solicitas
    INTERNAL_SERVER_ERROR:      {httpStatusCode: 500, title:'Internal Server Error', detail:'A problem ocurred on the server. Retry the operation in a few seconds',  url:'/internal-server-error'  },    // error atrapado, pincho algo en el servidor
    BAD_REQUEST:                {httpStatusCode: 400, title:'Bad Request',           detail:'Missing request obligatory data',                                        url:'/bad-request'            },              // alguno de los parametros de input esta mal
}

const createErrorDocument = (
    errorDocument: ERROR_DOCUMENT_TYPE[keyof ERROR_DOCUMENT_TYPE],
    extensionObject:Record<string, Object | null> | null = null,
    title:  undefined | null | string = undefined,
    detail: undefined | null | string = undefined,
): ProblemDocument => {
  const problem = new ProblemDocument({
    type: `https://example.com/errors${errorDocument.url}`,
    status: errorDocument.httpStatusCode,
    title:  title   || errorDocument.title,
    detail: detail  || errorDocument.detail,
  }, extensionObject ? new ProblemDocumentExtension(extensionObject) : undefined);
  return problem;
}

export default createErrorDocument;