import React, { useState } from 'react'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({ setModal, animarModal, setAnimarModal }) => {
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [categoria, setCategoria] = useState('')
    const ocultarModal = () => {
        setAnimarModal(false)
        setTimeout(() => {
            setModal(false)
        }, 500)
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CerrarBtn}
                    alt="cerrar modal"
                    onClick={ocultarModal}
                />
            </div>
            <form
                action=""
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
            >
                <legend>Nuevo Gasto</legend>
                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Añade nombre del gasto"
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        id="cantidad"
                        type="number"
                        placeholder="Añade la cantidad del gasto"
                        value={cantidad}
                        onChange={(event) =>
                            setCantidad(Number(event.target.value))
                        }
                    />
                </div>
                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        name=""
                        id="categoria"
                        value={categoria}
                        onChange={(event) => setCategoria(event.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input type="submit" value="Añadir Gasto" />
            </form>
        </div>
    )
}

export default Modal
