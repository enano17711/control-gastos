import React from 'react';
import NuevoPresupuesto from "./NuevoPresupuesto.jsx";

const Header = () => {
    return (
        <header>
            <h1>Planificador de gastos</h1>
            <NuevoPresupuesto/>
        </header>
    );
};

export default Header;