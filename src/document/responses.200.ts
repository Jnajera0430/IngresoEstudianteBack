export const responseOkAuthUser = () => ({
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

export const responseOkCreateUser = () => (
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

export const responseOkListUser = () => (
  {
    status: 200,
    description: 'Users list with your type of roles',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/CreateUserDto'
        },
        example: {
          "status": 200,
          message: "list users",
          data: [
            {
              "id": 21,
              "email": "example4@gm.com",
              "username": "exampleUser4",
              "createdAt": "2023-06-17T07:37:49.159Z",
              "state": true,
              "role": [
                {
                  "id": 1,
                  "tipo": "Super usuario"
                }
              ]
            },
            {
              "id": 22,
              "email": "example@gm.com",
              "username": "exampleUser",
              "createdAt": "2023-06-17T07:47:03.252Z",
              "state": true,
              "role": [
                {
                  "id": 1,
                  "tipo": "Super usuario"
                },
                {
                  "id": 2,
                  "tipo": "Administrador"
                },
                {
                  "id": 3,
                  "tipo": "Auditor"
                }
              ]
            },
            {
              "id": 24,
              "email": "example5@gm.com",
              "username": "exampleUser5",
              "createdAt": "2023-06-21T02:39:22.479Z",
              "state": true,
              "role": [
                {
                  "id": 1,
                  "tipo": "Super usuario"
                }
              ]
            },
            {
              "id": 26,
              "email": "example6@gm.com",
              "username": "exampleUser6",
              "createdAt": "2023-06-22T00:25:57.686Z",
              "state": true,
              "role": [
                {
                  "id": 1,
                  "tipo": "Super usuario"
                }
              ]
            }
          ]
        }
      }
    }
  }
)

export const responseOkfindUserById = () => (
  {
    status: 200,
    description: 'Users list with your type of roles',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/CreateUserDto'
        },
        example: {
          "status": 200,
          message: "user found",
          data:
          {
            "id": 21,
            "email": "example4@gm.com",
            "username": "exampleUser4",
            "createdAt": "2023-06-17T07:37:49.159Z",
            "state": true,
            "role": [
              {
                "id": 1,
                "tipo": "Super usuario"
              }
            ]
          },
        }
      }
    }
  }
)