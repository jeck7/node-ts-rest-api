// If you see linter errors for 'express' or 'body-parser', run:
// npm install express body-parser
// npm install --save-dev @types/express @types/body-parser
import express from 'express';
import bodyParser from 'body-parser';
import { setUserRoutes } from './routes/userRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(bodyParser.json());
setUserRoutes(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

// At the end of the file, export the app
export default app;