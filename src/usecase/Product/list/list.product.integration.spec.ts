import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test list product use case", () => {
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
    it("should list products", async () => {

        const productRepository = new ProductRepository();
        const useCase = new ListProductUseCase(productRepository);

        const product = new Product("1", "Product 1", 10);
        const product2 = new Product("2", "Product 2", 20);

        await productRepository.create(product);
        await productRepository.create(product2);
        const output = await useCase.execute([product, product2]);

        expect(output.products.length).toBe(2);

    });
});