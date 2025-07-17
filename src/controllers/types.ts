type ResponseDataMetadataTranslate = {
    key: string,        
    translate:boolean
}

type ResponseData = {
    rows?: Array<any>;
    error?:any;
}

// Extender el tipo de Session para incluir campos de auth
declare module 'express-session' {
  interface SessionData {
    userId: string;
    username: string;
    // Compatibilidad con el sistema existente
    authUserId: string;
    name: string;
    email: string;
  }
}


export default ResponseData;