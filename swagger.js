const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project 2 Api CSE 341',
        description: 'Project 2 Api'
    },
    host: 'localhost:5500',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = [
    './routes/index.js'
];

console.log('Scanning files: ', endpointsFiles);

// This will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
