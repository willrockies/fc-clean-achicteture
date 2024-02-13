import express, { Express } from "express";

import CustomerModel from "../customer/repository/sequelize/customer.model";
import { Sequelize } from "sequelize-typescript";
import { customerRoute } from "./route/customer.route";
import { productRoute } from "./route/product.route";

export const app: Express = express();
app.use(express.json());
app.use("/customer", customerRoute);
app.use("/product", productRoute);

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
}

setupDb();