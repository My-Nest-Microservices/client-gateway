import 'dotenv/config';
import * as joi from 'joi';
import { PRODUCT_SERVICE } from './services';

interface EnvVars {
  PORT: number;

  // PRODUCTS_MICROSERVICE_HOST: string;
  // PRODUCTS_MICROSERVICE_PORT: number;

  // ORDERS_MICROSERVICE_HOST: string;
  // ORDERS_MICROSERVICE_PORT: number;

  NATS_SERVERS: string[];
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    // PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    // PRODUCTS_MICROSERVICE_PORT: joi.number().required(),

    // ORDERS_MICROSERVICE_HOST: joi.string().required(),
    // ORDERS_MICROSERVICE_PORT: joi.string().required(),

    NATS_SERVERS: joi.array().items(joi.string().required()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  // productsHost: envVars.PRODUCTS_MICROSERVICE_HOST,
  // productsPort: envVars.PRODUCTS_MICROSERVICE_PORT,

  // ordersHost: envVars.ORDERS_MICROSERVICE_HOST,
  // ordersPort: envVars.ORDERS_MICROSERVICE_PORT,

  natsServers: envVars.NATS_SERVERS,
};
