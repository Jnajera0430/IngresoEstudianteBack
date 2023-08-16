import { ApiBodyOptions } from "@nestjs/swagger";
interface exampleInterface{
  value: Object,
  summary: string,
}
interface bodyInterface {
  type?: string,
  description?: string,
  example1?: exampleInterface | object,
  required?: boolean,
  ref?:string
}

export const bodyExampleAuthUser = ():ApiBodyOptions => (
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

export const bodyExampleCreateUser = ():ApiBodyOptions => (
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

export const bodyExampleUpdateUser = ():ApiBodyOptions => (
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

export const bodyExampleRoleDto = (required:boolean = false):ApiBodyOptions => (
  {
    type: 'RoleDto',
    description: 'Values required for search or create a role',
    examples: {
      example1: {
        value: {
          "id?":1234,
          "tipo": "Puesto de servicio"
        },
        summary: 'Example of values required',

      },
    },
    required,
    schema: {
      $ref: '#/components/schemas/UpdateUserDto'
    }
  }
);

export const abstractBodyExample= ({type,description,example1,required,ref}:bodyInterface):ApiBodyOptions =>({
  type,
  description,
  examples: {
    example1,
  },
  required,
  schema: {
    $ref: ref
  }
})