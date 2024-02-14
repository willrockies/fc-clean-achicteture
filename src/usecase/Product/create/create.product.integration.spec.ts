import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test create product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    it("should create a product type a", async () => {
        const product = new Product("1", "Product 1", 100);

        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        await productRepository.create(product);

        const input = {
            type: "a",
            name: product.name,
            price: product.price

        }
        const output = {
            id: expect.any(String),
            name: "Product 1",
            price: 100
        }
        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });

    it("should create a product type b", async () => {
        const product = new Product("1", "Product 1", 100);

        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        await productRepository.create(product);

        const input = {
            type: "b",
            name: product.name,
            price: product.price

        }
        const output = {
            id: expect.any(String),
            name: "Product 1",
            price: 200
        }
        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });
})