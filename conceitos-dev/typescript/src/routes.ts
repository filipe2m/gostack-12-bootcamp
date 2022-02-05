import { Request, Response } from 'express'
import createUser from './services/CreateUser'

export function helloTypescript(request: Request, response: Response) {
    const user = createUser({
        name: 'Filipe',
        email: 'fm.mendes@gmail.com',
        password: '1234567890',
        techs: [
            'Node.js',
            'ReactJS',
            'React Native',
            { title: 'Javascript', experience: 90 }
        ]
    })

    return response.json({ message: 'Hello Typescript' })
}