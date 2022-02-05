import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '../config/auth'

import AppError from '../errors/AppError'

import User from '../models/User'

interface RequestDTO {
    email: string,
    password: string
}

interface ResponseDTO {
    user: User,
    token: string
}

class AuthtenticateUserService {
    public async execute({ email, password }: RequestDTO): Promise<ResponseDTO>{
        const userRepository = getRepository(User)

        const user = await userRepository.findOne({ where: { email } })

        if(!user) {
            throw new AppError('Incorrect email/password combination', 401)
        }

        // password - senha não Criptografada
        // user.password - senha criptografada
        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401)
        }

        const { secret, expiresIn } = authConfig.jwt
        
        // User autenticado
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        })

        return { user, token }
    }
}

export default AuthtenticateUserService