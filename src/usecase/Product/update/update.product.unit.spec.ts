import Product from "../../../domain/product/entity/product";
import { UpdateProductUseCase } from "./update.product.usecase";

const product =new Product( "1","Product 1", 10);
const input = {
    id: product.id,
    name: "Product updated",
    price: 20
}
    

    const MockRepository = () => {
        return {
            create: jest.fn(),
            findAll: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(product)),
            update: jest.fn(),
    
        }
    }
describe("Unit test for product update use case", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository();
        const customerUpdateUseCase = new UpdateProductUseCase(productRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    })
});