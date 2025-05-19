export interface LoginCredentials {
    email: string,
    password: string
}

export interface RegisterCredentials {
    firstName: string,
    lastName: string,
    email:string,
    phoneNumber: string,
    password: string,
    repassword: string,
    role: string
}

export interface User {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    roleId: number
}