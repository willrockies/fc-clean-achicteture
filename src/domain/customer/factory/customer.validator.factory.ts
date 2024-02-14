import Customer from "../entity/customer";
import ValidatorInterface from "../validator/validator.interface";
import CustomerYupValidator from "../validator/validator.yup.validator";

export default class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerYupValidator();
  }
}