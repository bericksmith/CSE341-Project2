const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project 2 Api CSE 341 ',
        description: 'Project 2 Api'
    },
    host: 'https://cse341-project2-dcl4.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);