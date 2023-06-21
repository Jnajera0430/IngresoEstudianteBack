export const responseErrorServer=()=>(
    {
        status: 500,
        description: 'Error internal server',
        content: {
            'application/json': {
                example: {
                    "status": 500,
                    "message": "Internal Server Error",
                    "error": "An unexpected error occurred."
                }
            }
        }
    }
)