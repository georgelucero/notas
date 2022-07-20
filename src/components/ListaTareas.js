import React, { Fragment, useRef, useState, useEffect} from "react";
import Cards from "../Cards";
import {v4 as uuid} from "uuid";

export function ListaTareas() {

    // El hook useState permite ratrear un estado (datos o propiedades)
    // tareas: estado que se desea mantener, array de tareas
    // setTareas: función usada para actualizar el estado
    const [tareas, setTareas] = useState([]);
   

    // El hook useRef permite persistir valores entre renderizados. Se pueden
    // utilizar para almacenar valores mutables
    const texto = useRef();
    const titulo = useRef();
    

    // Clave que identifica el objeto almacenado en LocalStorage
    const KEY = "todolist-tareas";
    

    // El hook useEffect permite realizar tareas adicionales en un componente:
    // obtener datos, manipular directamente el DOM, temporizador

    // useEffect(<funcion>, <dependencia>)
    // dependencias: vacio, array vacío (primer renderizado), array con valores (cuando se
    // produce un cambio en el array)

    // Obtener desde el localStorage la lista de tareas (en formato JSON), bajo el nombre
    // "todolist-tareas", y las carga en el array "tareas" en el primer renderizado
    useEffect(() => {
        const tareasStorage = JSON.parse(localStorage.getItem(KEY));
        console.log(tareasStorage);
        setTareas( (tareasAnteriores) => {
            return [...tareasAnteriores, ...tareasStorage];
        });
    }, [] );
   

    // Almacena en el localStorage la lista de tareas (en formato JSON) bajo el nombre
    // clave "todolist-tareas" cada vez que se produce un cambio en el array
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(tareas));
    }, [tareas] );
   
    

    function agregarArr() {
        const value2 = texto.current.value;
        const value1 = titulo.current.value;
        

        if (value2 === '' && value1 === '') return;
        console.log(value2);
        console.log(value1);
        console.log(uuid());
        
        // Objeto con 2 propiedades: id, valor
        // Id es generado aleatoriamente
        const nuevaTarea = {
            id: uuid(),
            valor2: value2,
            valor1: value1
           
        }
        

        // Operador de propagación (spread) permite hacer una copia de un array en
        // un array existente
        setTareas( (tareasAnteriores) => {
            return [...tareasAnteriores, nuevaTarea];
        });
        
    }

    return (
        <Fragment>
            <div className="container col-9">
                <h2>Listado de tareas</h2>
                <div className="input-group mt-4 mb-2">
                    <input ref={titulo} type="text" className="form-control" placeholder="Titulo"/>
                    <input ref={texto} type="text" className="form-control" placeholder="Descripcion"/>
                    
                    <button onClick={agregarArr} className="btn btn-success ms-2">Agregar +</button>
                    
                </div>
                <div>
    
                    {tareas.map((item)=><Cards key={item.id} titulo={item.valor1} texto={item.valor2}></Cards>)}
                </div>
            </div>
            
        </Fragment>
    );
}
