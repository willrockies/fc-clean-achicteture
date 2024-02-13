import { app, sequelize } from '../express';
import request from 'supertest';

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create products", async () => {
      const response = await request(app)
        .post("/product")
        .send({
          name: "Product 1",
          price: 100,
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(100);
      });

      it("should list products", async () => {
        const response = await request(app)
        .post("/product")
        .send({
          name: "Product 1",
          price: 100,
        });

        const response2 = await request(app)
        .post("/product")
        .send({
          name: "Product 1",
          price: 100,
        });
    
        expect(response2.status).toBe(200);
        
        const listResponse = await request(app).get("/product").send();
    
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
      })
})