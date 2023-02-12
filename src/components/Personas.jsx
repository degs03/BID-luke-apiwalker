import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Personas = () => {
    const [persona, setPersonas] = useState({});
    const { id } = useParams();
    useEffect(() => {
        axios.get(`https://swapi.dev/api/people/${id}`)
            .then(response => response.data)
            .then(result => {
                console.log(result);
                setPersonas(result);
            })
            .catch(error => { console.log(error) })
    }, [])

    return (
        <div>
            <h1>Ruta de Personas {id}</h1>
            {
                <div>
                    <h1>{persona.name ? persona.name : persona.title}</h1>
                    <p>
                        {
                            persona.height ?
                                <p>Height: {persona.height}'</p> :
                                null
                        }
                        {
                            persona.hair_color ?
                                <p>Hair color: {persona.hair_color}</p> :
                                null
                        }
                        {
                            persona.eye_color ?
                                <p>Eye color: {persona.eye_color}</p> :
                                null
                        }
                    </p>
                </div>
            }
        </div>
    )
}

export default Personas