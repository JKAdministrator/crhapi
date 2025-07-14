type ResponseDataMetadataTranslate = {
    key: string,        
    translate:boolean
}

type ResponseDataMetadata = {
    translate?: Array<string>,
    replace?: Array<{key:string, column:string}>
}

type ResponseData = {
    rows?: Array<any>;
    metadata?: ResponseDataMetadata;
    error?:any;
}

export default ResponseData;