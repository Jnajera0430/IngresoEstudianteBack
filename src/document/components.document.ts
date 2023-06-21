export const configComponents = () => ({
    schemas: {
        CreateUserDto: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    description: 'El email del usuario',
                },
                username: {
                    type: 'string',
                    description: 'Alias del usuario',
                },
                password: {
                    type: 'string',
                    format: 'email',
                    description: 'La clave secreta del del usuario.',
                },
            },
            required: ['email', 'username', 'password'],
        },
        AuthUserDto: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    description: 'El email de usuario'
                },
                password:{
                    type:'string',
                    description:'La clave del usuario'
                }
            }
        }
    },
})