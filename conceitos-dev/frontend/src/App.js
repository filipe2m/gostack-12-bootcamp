import React, { useState, useEffect } from 'react'
import api from './services/api'

import './App.css';

import Header from './components/Header'

/**
 * Componente
 * Propriedade
 * Estado & Imutabilidade
 */

function App(){
    const [projects, setProjects] = useState([])

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data)
        })
    }, [])

    /**
     * useState retorna um array com 2 posiçoes
     * 
     * 1. Variavel com o seu valor inicial
     * 2. Funçao para atualizarmos esse valor
     */

    async function handleAddProject() {
        // projects.push(`Novo projeto ${Date.now()}`)

        // setProjects([...projects, `Novo projeto ${Date.now()}`])
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: "Filipe Mendes"
        })

        const project = response.data

        setProjects([...projects, project])

        //console.log(projects)
    }

    return (
        <>
            <Header title="Homepage">
                <ul>
                    <li>Homepage</li>
                    <li>Projects</li>
                </ul>
            </Header>
            <Header title="Projects" />
            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
        </>
    )
}

export default App