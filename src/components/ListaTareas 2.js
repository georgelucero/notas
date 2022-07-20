import React, { Fragment, useRef, useState, useEffect} from "react";
import  ItemTarea from "./ItemTarea";
import ItemTitulo from "./ItemTitulo";
import {v4 as uuid} from "uuid";

export function ListaTareas() {

    // El hook useState permite ratrear un estado (datos o propiedades)
    // tareas: estado que se desea mantener, array de tareas
    // setTareas: función usada para actualizar el estado
    const [tareas, setTareas] = useState([]);
    const [titulos, setTitulos] = useState([]);

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
    useEffect(() => {
        const titulosStorage = JSON.parse(localStorage.getItem(KEY));
        console.log(titulosStorage);
        setTitulos( (titulosAnteriores) => {
            return [...titulosAnteriores, ...titulosStorage];
        });
    }, [] );

    // Almacena en el localStorage la lista de tareas (en formato JSON) bajo el nombre
    // clave "todolist-tareas" cada vez que se produce un cambio en el array
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(tareas));
    }, [tareas] );
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(titulos));
    }, [titulos] );

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
            valor2: value2
        }
        const nuevaTitulo = {
            id: uuid(),
            valor1: value1
           
        }

        // Operador de propagación (spread) permite hacer una copia de un array en
        // un array existente
        setTareas( (tareasAnteriores) => {
            return [...tareasAnteriores, nuevaTarea];
        });
        setTitulos( (titulosAnteriores) => {
            return [...titulosAnteriores, nuevaTitulo];
        });
    }

    return (
        <Fragment>
            <div className="container m-2">
                <h2>Listado de tareas</h2>
                <div className="input-group mt-4 mb-2">
                    <input ref={titulo} type="text" className="form-control" placeholder="Titulo"/>
                    <input ref={texto} type="text" className="form-control" placeholder="Descripcion"/>
                    <button onClick={agregarArr} className="btn btn-success ms-2">Agregar +</button>
                </div>
                </div>
                <div class="container bootstrap snippets bootdeys">
                    <div class="row">
                     <div class="col-md-4 col-sm-6 content-card">
                        <div class="card-big-shadow">
            <div class="card card-just-text" data-background="color" data-color="blue" data-radius="none">
                <div class="content">
                    <h4 class="title">{titulos.map((item) =><ItemTitulo key={item.id} titulotexto={item.valor1} ></ItemTitulo>)}</h4>
                    <p class="description">{tareas.map((item)=><ItemTarea key={item.id} texto={item.valor2}></ItemTarea>)} </p>
                </div>
            </div> 
        </div>
    </div>
                
                </div>
                
            </div>
            
        </Fragment>
    );
}
