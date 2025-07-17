"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTest = async (req, res, next) => {
    const r = {};
    r.rows = ["Hola mundo"];
    /*
    if (1 === 1) {
        const errorDocument = createErrorDocument(ERROR_DOCUMENT.BAD_REQUEST, { userId:"sarasa" }, null, 'User ID is required');
        res.status(errorDocument.status).send(errorDocument);
        return;
    }
    */
    res.status(200).send(r);
    return;
};
exports.default = getTest;
