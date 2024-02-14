import Product from "../entity/product";
import ValidatorInterface from "../validator/validator.interface";
import ProductYupValidator from "../validator/validator.yup.validator";

export default class ProductValidatorFactory {
    static create(): ValidatorInterface<Product> {
        return new ProductYupValidator();
    }
}