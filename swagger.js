const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project 2 Api CSE 341',
        description: 'Project 2 Api'
    },
    host: 'localhost:5500',
    schemes: ['http'],
    securityDefinitions: {
        OAuth2: {
            type: 'oauth2',
            flow: 'accessCode',
            authorizationUrl: 'https://github.com/login/oauth/authorize',
            tokenUrl: 'https://github.com/login/oauth/access_token',
            scopes: {
                read: 'Grants read access',
                write: 'Grants write access'
            }
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = [
    './routes/index.js', // Add any additional route files if necessary
    './routes/users.js', // Include this if you have separate routes for users
    './routes/products.js' // Include this if you have separate routes for products
];

console.log('Scanning files: ', endpointsFiles);

// This will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);