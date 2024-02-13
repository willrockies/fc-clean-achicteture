import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import FindProductUseCase from "./find.product.usecase";


const product = new Product("123", "Product A", 10);

describe("Unit test find product use case", () => {
    const MockProductRepository = () => {
        return {
            find: jest.fn().mockResolvedValueOnce(Promise.resolve(product)),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        }
    };

    it("should find a product", async () => {
        const productRepository = MockProductRepository();
        const useCase = new FindProductUseCase(productRepository);

        await productRepository.create(product);

        const input = {
            id: "123",
        };

        const output = {
            id: "123",
            name: "Product A",
            price: 10,
        };

        const result = await useCase.execute(input);
        expect(result).toEqual(output);
    })

})