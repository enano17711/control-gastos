import Header from './components/Header.jsx'
import { useEffect, useState } from 'react'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal.jsx'
import { generarId } from './helpers/index.js'
import ListadoGastos from './components/ListadoGastos.jsx'
import Filtros from './components/Filtros.jsx'

function App() {
    const [presupuesto, setPresupuesto] = useState(
        Number(localStorage.getItem('presupuesto')) ?? 0
    )
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
    const [modal, setModal] = useState(false)
    const [animarModal, setAnimarModal] = useState(false)
    const [gastos, setGastos] = useState(
        localStorage.getItem('gastos')
            ? JSON.parse(localStorage.getItem('gastos'))
            : []
    )
    const [gastoEditar, setGastoEditar] = useState({})
    const [filtro, setFiltro] = useState('')
    const [gastosFiltrados, setGastosFiltrados] = useState([])

    useEffect(() => {
        if (gastoEditar.nombre) {
            setModal(true)
            setTimeout(() => {
                setAnimarModal(true)
            }, 500)
        }
    }, [gastoEditar])
    useEffect(() => {
        localStorage.setItem('presupuesto', presupuesto ?? 0)
    }, [presupuesto])

    useEffect(() => {
        localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
    }, [gastos])

    useEffect(() => {
        if (filtro) {
            const gastosFiltrados = gastos.filter(
                (gastoST) => gastoST.categoria === filtro
            )
            setGastosFiltrados(gastosFiltrados)
        }
    }, [filtro])

    useEffect(() => {
        const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
        if (presupuestoLS > 0) setIsValidPresupuesto(true)
    }, [])
    const handleNuevoGasto = () => {
        setModal(true)
        setGastoEditar({})
        setTimeout(() => {
            setAnimarModal(true)
        }, 500)
    }
    const guardarGasto = (gasto) => {
        if (gasto.id) {
            const gastosActualizados = gastos.map((gastoState) =>
                gastoState.id === gasto.id ? gasto : gastoState
            )
            setGastos(gastosActualizados)
        } else {
            gasto.id = generarId()
            gasto.fecha = Date.now()
            setGastos([...gastos, gasto])
        }
        setAnimarModal(false)
        setTimeout(() => {
            setModal(false)
        }, 500)
    }
    const eliminarGasto = (id) => {
        const gastosActualizados = gastos.filter(
            (gastosState) => gastosState.id !== id
        )
        setGastos(gastosActualizados)
    }

    return (
        <div className={modal ? 'fijar' : ''}>
            <Header
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />
            {isValidPresupuesto && (
                <>
                    <main>
                        <Filtros filtro={filtro} setFiltro={setFiltro} />
                        <ListadoGastos
                            gastos={gastos}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                            gastosFiltrados={gastosFiltrados}
                            filtro={filtro}
                        />
                    </main>
                    <div className="nuevo-gasto">
                        <img
                            src={IconoNuevoGasto}
                            alt="icono nuevo gasto"
                            onClick={handleNuevoGasto}
                        />
                    </div>
                </>
            )}
            {modal && (
                <Modal
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                />
            )}
        </div>
    )
}

export default App
