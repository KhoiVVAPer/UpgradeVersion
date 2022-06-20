import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

export const addressSchema = {
  name: schemas.ADDRESS_SCHEMA,
  primaryKey: 'addressId',
  properties: {
    addressId: 'int',
    city: 'string',
    address: 'string',
    state: 'string',
    pincode: 'string'
  }
};

export const employeeSchema = {
  name: schemas.EMPLOYEE_SCHEMA,
  primaryKey: 'employeeId',
  properties: {
    employeeId: 'int',
    name: { type: 'string', optional: true },
    birthDate: 'date',
    isMarried: 'bool',
    addresses: { type: 'list', objectType: schemas.ADDRESS_SCHEMA },
    profileImg: 'string'
  }
};
