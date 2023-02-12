import { useEffect, useState } from 'react'
import axios from 'axios';
import styles from './Navbar.module.css'

const Navbar = () => {
    const [opciones, setOpciones] = useState([]);
    const [selected, setSelected] = useState("");
    const [id, setId] = useState("1");
    const [error, setError] = useState(false);
    const [persona, setPersona] = useState([]);
    useEffect(() => {
        axios.get("https://swapi.dev/api/")
            .then(response => response.data)
            .then(result => {
                console.log(result);
                let resultList = [];//Aqui se guardaran los elementos de la lista
                for (const [key, value] of Object.entries(result)) { //para iterar por la lista de la api ya que no es un array
                    resultList.push({ name: key, route: value });//Aqui se hace push del nombre y del link de la lista
                }


                setOpciones(resultList);
                console.log(resultList);
                setSelected(resultList[0].url)//garantizamos que cuando tenemos las nuevas opciones, arranca teniendo la primera opcion en el valor que va a estar seleccionado.
            })
            .catch(error => console.log(error))

    }, []);


    useEffect(() => {
        console.log(selected);
    }, [selected])

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("DIRECCION", selected + id);
        let url = selected + id;
        axios.get(url)
            .then(response => response.data)
            .then(result => {
                console.log(result);
                setPersona(result);
                setError(false);
            })
            .catch(error => {
                console.log(error);
                setError(true);
            })
    }

    return (
        <>
        <p style={{textAlign:'center'}}>Search for:</p>
            <form onSubmit={handleSearch}>
                <div className={styles.navb}>
                    <select value={selected} onChange={e => setSelected(e.target.value)} className={styles.selected}> {/* se le asigna como valor el 'selected' y se le setea el value al detectar un cambio, su value seria 
                                                                                      lo que la opcion le pase como valor */}
                        {
                            opciones.map((item, idx) => <option key={idx} value={item.route}>{item.name}</option>)
                        }
                    </select>
                    <div>
                        <input type='number' value={id} onChange={e => setId(e.target.value)} /> {/*Entrada controlada */}
                        <button className={styles.search}>Buscar</button>
                    </div>
                </div>
            </form>
            {
                error ?
                    <div className={styles.imageBox}>
                        <img src='https://media.tenor.com/9jSdRC6_W68AAAAd/obi-wan-kenobi-no.gif' height='300px' />
                        <h1>Estos no son los droides que estas buscando!</h1>
                    </div>
                    :
                    <div className={styles.contenido}>
                        <h1>{persona.name ? persona.name : persona.title}</h1>
                        <p>
                            {
                                persona.height ?
                                    <p>Height: {persona.height}'</p> :
                                    persona.model ?
                                        <p>Model: {persona.model}</p> :
                                        persona.director ?
                                            <p>Director: {persona.director}</p> :
                                            persona.rotation_period ?
                                                <p>Rotation period: {persona.rotation_period}</p> :
                                                persona.classification ?
                                                    <p>Clasificacion: {persona.classification}</p> : null
                            }
                            {
                                persona.hair_color ?
                                    <p>Hair color: {persona.hair_color}</p> :
                                    persona.manufacturer ?
                                        <p>Manufacturer: {persona.manufacturer}</p> :
                                        persona.producer ?
                                            <p>Producer: {persona.producer}</p> :
                                            persona.orbital_period ?
                                                <p>Orbital period: {persona.orbital_period}</p> :
                                                persona.designation ?
                                                    <p>Designation: {persona.designation}</p> : null
                            }
                            {
                                persona.eye_color ?
                                    <p>Eye color: {persona.eye_color}</p> :
                                    persona.cost_in_credits ?
                                        <p>Cost in credits: {persona.cost_in_credits}</p> :
                                        persona.release_date ?
                                            <p>Release Date: {persona.release_date}</p> :
                                            persona.diameter ?
                                                <p>Diameter: {persona.diameter}</p> :
                                                persona.average_height ?
                                                    <p>Average Height: {persona.average_height} '</p> : null
                            }
                        </p>
                    </div>
            }
        </>
    )
}

export default Navbar