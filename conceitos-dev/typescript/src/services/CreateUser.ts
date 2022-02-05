/**
 * Para criar um utilizador é nessario o name, email e password
 */

 /*
export default function createUser(name = '', email: string, password: string) {
    const user = {
        name,
        email,
        password
    }

    return user
}
*/

/**
 * String, Number, Boolean, Object, Array
 * interfaces
 */

interface TechObject {
    title: string
    experience: number
}

interface CreateUserData {
    name?: string
    email: string
    password: string
    techs: Array<string | TechObject>
}

export default function createUser({ name, email, password, techs }: CreateUserData) {
    const user = {
        name,
        email,
        password,
        techs
    }
    return user
}