import express from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';

const router = express.Router();

// Load OpenAPI spec
const openApiPath = join(process.cwd(), '..', 'api', 'spec.yaml');
const openApiFile = readFileSync(openApiPath, 'utf8');
const openApiSpec = YAML.parse(openApiFile);

// Serve OpenAPI JSON
router.get('/openapi.json', (req, res) => {
  res.json(openApiSpec);
});

// Serve OpenAPI YAML
router.get('/openapi.yaml', (req, res) => {
  res.type('text/yaml').send(openApiFile);
});

// Serve Swagger UI
router.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec, {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true
  }
}));

export default router;
