const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');

// Leer el bundle
const bundleCode = fs.readFileSync('dist/bundle.js', 'utf8');

// Configuración de ofuscación
const obfuscationResult = JavaScriptObfuscator.obfuscate(bundleCode, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: true,
    debugProtectionInterval: 2000,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayEncoding: ['base64'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 4,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
});

// Guardar el código ofuscado
fs.writeFileSync('dist/bundle-obfuscated.js', obfuscationResult.getObfuscatedCode());
console.log('✅ Código ofuscado guardado en dist/bundle-obfuscated.js');
