import express, { Request, Response } from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/Product/list/list.product.usecase";
import CreateProductUseCase from "../../../usecase/Product/create/create.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(new ProductRepository());

  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price

    }
    const output = await useCase.execute(productDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }

});

productRoute.get("/", async (req: Request, res: Response) => {
  try {
    const input = {};
    const productRepository = new ProductRepository();
    const listProductUseCase = new ListProductUseCase(productRepository);
    const output = await listProductUseCase.execute(input);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});