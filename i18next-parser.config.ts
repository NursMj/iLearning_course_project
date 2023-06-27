export default {
    defaultNamespace: 'translation',
    lexers: {
        default: ['JavascriptLexer']// Use the JavascriptLexer for TypeScript files
    },

    locales: ['en', 'ru'], // List of supported locales
    output: 'public/locales/$LOCALE/$NAMESPACE.json', // Output file for extracted messages
    input: [
        'src/**/*.tsx', // Include TypeScript files
    ],
    discardOldKeys: true,
}