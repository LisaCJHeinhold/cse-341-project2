const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'Employee-Department API',
      description: 'An api to hold employee and department info',
    },
    host: 'localhost:3000',
    schemes: ['http'],
  };
  
  const outputFile = './swagger.json';
  const endpointsFiles = ['./routes/index.js'];
  
  //this will generate swagger.json
  swaggerAutogen(outputFile, endpointsFiles, doc);