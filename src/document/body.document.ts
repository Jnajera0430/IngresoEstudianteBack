export const bodyExampleAuthUser = () => (
  {
    type: 'AuthUserDto',
    description: 'Values required for Authenticate',
    examples: {
      example1: {
        value: {
          email: 'example@gm.com',
          password: 'sena123',
        },
        summary: 'Example of values required',
      },
    },
    schema: {
      example: {
        email: 'string',
        password: 'string',
      }
    }
  }
)

export const bodyExampleCreateUser = () => (
  {
    type: 'CreateUserDto',
    description: 'Values required for create a user',
    examples: {
      example1: {
        value: {
          "email": "example5@gm.com",
          "username": "exampleUser5",
          "password": "sena123",
          "roles": [1]
        },
        summary: 'Example of values required',

      },
    },
    required: true,
    schema: {
      $ref: '#/components/schemas/CreateUserDto'
    }
  }
);

export const bodyExampleUpdateUser = () => (
  {
    type: 'UpdateUserDto',
    description: 'Values required for create a user',
    examples: {
      example1: {
        value: {
          "id":1234,
          "email?": "example5@gm.com",
          "username?": "exampleUser5",
          "password?": "sena123",
          "state?": true,
          "roles?": [1]
        },
        summary: 'Example of values required',

      },
    },
    required: false,
    schema: {
      $ref: '#/components/schemas/UpdateUserDto'
    }
  }
);