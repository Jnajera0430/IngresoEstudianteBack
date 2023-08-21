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
        UpdateUserDto: {
            type: 'object',
            properties: {
                id:{
                    type: 'string',
                    description:'Id del usuario',
                },
                email: {
                    type: 'string',
                    format:'email',
                    description: 'El email del usuario',
                },
                username: {
                    type: 'string',
                    description: 'Alias del usuario',
                },
                password: {
                    type: 'string',
                    format: 'password',
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