import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () =>{

  it("Should change the prices of all products", () => {
    
    //arrange
    const product1 = new Product("1", "product 1", 10);
    const product2 = new Product("2", "product2", 20);
    const products = [product1,product2]


    //act
    ProductService.increasePrice(products, 100);

    //assert
    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
  })

});