export const responseErrorExampleAuthUser = () => (
    {
        status: 401,
        content: {
            'application/json': {
                example: {
                    "statusCode": 401,
                    ok: false,
                    "message": "Email or password does not match"
                }
            }
        }
    }
)

export const responseErrorExampleCreateUser400 = () => (
    {
        description: 'Bad request',
        content: {
            'application/json': {

                example: {
                    "status": 400,
                    message: "Bad request",
                    data: {
                        "error": "Data provided in the body are not valid"
                    }
                }
            }
        }
    }
)