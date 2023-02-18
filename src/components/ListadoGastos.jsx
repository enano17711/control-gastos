import React from 'react'
import Gasto from './Gasto.jsx'

const ListadoGastos = ({ gastos, setGastoEditar, eliminarGasto }) => {
    return (
        <div className="listado-gastos contenedor">
            {gastos.length ? 'Gastos' : 'No hay gastos'}
            {gastos.map((gasto) => (
                <Gasto
                    key={gasto.id}
                    gasto={gasto}
                    setGastoEditar={setGastoEditar}
                    eliminarGasto={eliminarGasto}
                />
            ))}
        </div>
    )
}

export default ListadoGastos
