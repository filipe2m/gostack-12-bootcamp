const express = require('express')
const cors = require('cors')
const { uuid, isUuid } = require('uuidv4')

const app = express()

app.use(cors())
app.use(express.json())

/**
 * Metodos HTTP:
 * 
 * GET: Obter informacoes do back-end
 * POST: Criar uma informacao no back-end
 * PUT: Alterar varias informacoes no back-end
 * PATCH: Altera uma informacao no back-end
 * DELETE: Apagar uma informacao no back-end
 */

 /**
  * Tipos de parametros principais
  * 
  * Query Params: Filtros e paginacao
  * Route Params: Identificar recursos (Atualizar/Apagar)
  * Request Body: Conteudo na hora de criar ou editar um recurso (JSON)
  */

  /**
   * Middleware:
   * 
   * Interceptador de requisicoes que pode interromper totalmente a requisicao ou alterar dados da requisicao
   * 
   */

const projects = []

function logRequests(request, response, next){
    const { method, url } = request

    const logLabel = `[${method.toUpperCase()}] ${url}`

    console.time(logLabel)

    next() // Proximo middleware

    console.timeEnd(logLabel)
}

function validateProjectId(request, response, next){
    const { id } = request.params

    if(!isUuid(id)) {
        return response.status(400).json({ error: 'Invalid project ID.' })
    }

    return next()
}

app.use(logRequests)
app.use('/projects/:id', validateProjectId)

app.get('/projects' , (request, response) => {
    //const query = request.query
    //Obter os dados do query destruturando os parametros
    const { title } = request.query

    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects
    

    //console.log(`Title: ${title}, Owner: ${owner}`)

    // return response.send(`Hello World`) Usado para testar rotas
    // return response.json({ message: `Hello World` })
    return response.json(results)
})

app.post('/projects' , (request, response) => {
    //const body = request.body
    //Obter os dados do query destruturando os parametros
    const { title, owner } = request.body

    //console.log(title)
    //console.log(owner)

    const project = { id: uuid(), title, owner }

    projects.push(project)

    return response.json(project)
})

app.put('/projects/:id' , (request, response) => {
    //const params = request.params
    //Obter os dados do query destruturando os parametros
    const { id } = request.params
    const { title, owner } = request.body

    //console.log(id)

    const projectIndex = projects.findIndex(project => project.id === id)

    if (projectIndex < 0 ){
        return response.status(400).json({ error: 'Project not found.' })
    }

    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project

    return response.json(project)
})

app.delete('/projects/:id' , (request, response) => {
    const { id } = request.params

    const projectIndex = projects.findIndex(project => project.id === id)

    if (projectIndex < 0 ){
        return response.status(400).json({ error: 'Project not found.' })
    }

    projects.splice(projectIndex, 1)

    return response.status(204).send()
})

app.listen(3333, () => {
    console.log(`🚀 Back-end started!`)
})