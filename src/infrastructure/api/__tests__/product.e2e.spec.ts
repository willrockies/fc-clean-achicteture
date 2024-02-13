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
            name: 'product 1',
            price: 100,
          });
        
         
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          id: response.body.id,
          name: response.body.name,
          price: response.body.price,
        })
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
        expect(listResponse.body.products.length).toBe(1);
      })
})