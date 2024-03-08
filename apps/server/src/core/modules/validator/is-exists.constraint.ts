import { Injectable } from "@nestjs/common"
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidatorOptions,
  registerDecorator,
} from "class-validator"
import { EntityManager, EntitySchema, ObjectType } from "typeorm"

export interface IsExistsConstraintOptions<E = unknown> {
  entity: ObjectType<E> | EntitySchema<E> | string
}

@ValidatorConstraint({ name: "IsExistsConstraint", async: true })
@Injectable()
export class IsExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  private getConstraintOptions<T>(validationArguments?: ValidationArguments) {
    return validationArguments?.constraints?.[0] as IsExistsConstraintOptions
  }

  async validate(value: unknown, validationArguments?: ValidationArguments): Promise<boolean> {
    const { entity } = this.getConstraintOptions(validationArguments)
    const property = validationArguments?.property || "id"

    const entityRepository = this.entityManager.getRepository(entity)

    return !!(await entityRepository.count({ where: { [property]: value } }))
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `The object is not exists`
  }
}

/**
 * The
 */
export function IsExists<E>(
  options: IsExistsConstraintOptions<E>,
  validatorOptions: ValidatorOptions,
) {
  // eslint-disable-next-line func-names, @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    return registerDecorator({
      propertyName,
      name: "IsExists",
      target: object.constructor,
      validator: IsExistsConstraint,
      async: true,
      constraints: [options],
      options: validatorOptions,
    })
  }
}