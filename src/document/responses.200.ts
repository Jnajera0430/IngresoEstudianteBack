export const responseOkAuthUser=()=>({
    status: 200,
    content: {
      'application/json': {

        example: {
          "status": 200,
          message: "success",
          ok: true,
          data: {
            "message": "User successfully logged in"
          }
        }
      }
    },
    headers: {
      'Set-Cookie': {
        description: 'Token de autenticación',
        schema: {
          type: 'string',
        }
      }
    }
  })

export const responseOkCreateUser=()=>(
  {
    status: 201,
    description: 'user created',
    content: {
        'application/json': {
            schema: {
                $ref: '#/components/schemas/CreateUserDto'
            },
            example: {
                "status": 200,
                message: "New user successfully created",
                data: {
                    "email": "example6@gm.com",
                    "username": "exampleUser6",
                    "password": "$2a$10$9Y1MDyA1NqtDuEo0GTgY1u4j0EQGZYNbQL1k51Zg3sDASw8XecTaa",
                    "role": [
                        {
                            "id": 1,
                            "tipo": "Super usuario"
                        }
                    ],
                    "id": 26,
                    "createdAt": "2023-06-22T00:25:57.686Z",
                    "state": true
                }
            }
        }
    }
}
) 