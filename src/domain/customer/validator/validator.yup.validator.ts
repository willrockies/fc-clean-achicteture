import Customer from "../entity/customer";
import ValidatorInterface from "./validator.interface";
import * as yup from 'yup';

// caso é necessario trocar a biblioteca assim 
// isso aqui é uma implementação concreta de um validador específico para minha entidade de cliente que está utilizando a biblioteca yup
// isso é uma classe concreta, que vai trabalhar com essa validação.
// estou gerando um acoplamento, implementando uma interface, porque se em algum momento eu quiser trocar essa biblioteca, eu posso trocar tranquilamente para uma outra biblioteca que vai fazer a validação.
export default class CustomerYupValidator implements ValidatorInterface<Customer> {
    validate(entity: Customer): void {
        try {

            yup
                .object()
                .shape({
                    id: yup.string().required("Id is required"),
                    name: yup.string().required("Name is required"),
                })
                .validateSync(
                    {
                        id: entity.id,
                        name: entity.name,
                    },
                    {
                        abortEarly: false,
                    }
                );

        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach((error) => {
                entity.notification.addError({
                    context: "customer",
                    message: error,
                });
            });
        }
    }

}