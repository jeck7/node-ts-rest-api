import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node TypeScript REST API',
      version: '1.0.0',
      description: 'API documentation for the Node.js TypeScript REST API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['src/routes/*.ts', 'src/controllers/*.ts', 'src/types/*.ts'], // files containing annotations
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec; 