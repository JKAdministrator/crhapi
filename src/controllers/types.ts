type ResponseDataMetadataTranslate = {
    key: string,        
    translate:boolean
}

type ResponseData = {
    rows?: Array<any>;
    error?:any;
}

export default ResponseData;