//constante: si podemos modificar el contenido del arreglo pero ya no la referencia que almacena la variable que tiene el arreglo.

const ingresos = [
    new Ingreso("Salario", 300),
    new Ingreso("Venta Coche", 300),
];

const egresos = [
    new Egreso("Renta Departamento", 20),
    new Egreso("Ropa", 10)
];


let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
};

let totalEgresos = () => {
    let totalEgresos = 0;
    for (let egreso of egresos) {
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
};

let totalIngresos = () => {
    let totalIngreso = 0;
    for (let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
};

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    document.getElementById("presupuesto").innerHTML =
        formatoMoneda(presupuesto);
    document.getElementById("ingresos").innerHTML = formatoMoneda(
        totalIngresos()
    );
    document.getElementById("egresos").innerHTML = formatoMoneda(
        totalEgresos()
    );
    document.getElementById("porcentaje").innerHTML =
        formatoPorcentaje(porcentajeEgreso);
};

const formatoMoneda = (valor) => {
    return valor.toLocaleString("es-ES", {
        style: "currency",
        currency: "PEN",
        miniumFractionDigits: 2,
    });
};

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString("es-ES", {
        style: "percent",
        miniumFractionDigits: 2,
    });
};

const cargarIngresos = () => {
    let ingresosHTML = "";
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresos(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const crearIngresos = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
                        <div class="elemento_descripcion">${ingreso.descripcion}</div>
                        <div class="derecha limpiarEstilos">
                            <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                            <div class="elemento_eliminar">
                                <button class="elemento_eliminar--btn">
                                    <ion-icon name="close-circle-outline" onclick = "eliminarIngreso(${ingreso.id})"></ion-icon>
                                </button>
                            </div>
                        </div>
                    </div>
    `;
    return ingresoHTML;
};

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex ( ingreso =>  ingreso.id == id)
    //for (let ingreso of ingresos)
    ingresos.splice(indiceEliminar, 1);
    cargarApp();
}

const cargarEgresos = () => {
    let egresoHTML =  "";
    for (let egreso of egresos){
        egresoHTML += crearEgresoHTML(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresoHTML
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
               <div class="elemento_valor" >${formatoMoneda(egreso.valor)}</div>
                  <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalIngresos())}</div>
                        <div class="elemento_eliminar">
                           <button class="elemento_eliminar--btn">
                               <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso.id})"></ion-icon>
                           </button>
                        </div>
                    </div>
                </div>
    `
    return egresoHTML;
}

let eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex( ingreso => ingreso.id === id);
    egresos.splice(indiceEliminar, 1)
    cargarApp();
}

let agregarDato= () => {
    let forma = document.forms["forma"]
    let tipo = forma["tipo"]
    let descripcion = forma["descripcion"]
    let valor = forma["valor"];

    if(descripcion.value !== "" && valor.value !== ""){
        if(tipo.value === "ingreso"){
            ingresos.push(new Ingreso(descripcion.value, +valor.value))
        }else if (tipo.value === "egreso") {
            egresos.push(new Egreso(descripcion.value, +valor.value))
        }
    }
    cargarApp()
}
