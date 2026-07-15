let chartInstance = null;

function calcularOptimizacion() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        alert('Por favor ingresa valores numéricos válidos en todos los campos.');
        return;
    }

    if (a <= 0) {
        alert('El coeficiente "a" debe ser positivo para que la parábola abra hacia arriba (mínimo).');
        return;
    }

    // Derivada
    const derivada = `C'(x) = ${2 * a}x + ${b}`;

    // Punto crítico
    const xOptimo = (-b) / (2 * a);
    const costoMinimo = a * Math.pow(xOptimo, 2) + b * xOptimo + c;

    // Mostrar resultados
    document.getElementById('punto-optimo').innerHTML = `x = <strong>${xOptimo.toFixed(2)}</strong> unidades`;
    document.getElementById('costo-minimo').innerHTML = `C(x) = <strong>$${costoMinimo.toFixed(2)}</strong>`;
    document.getElementById('derivada').innerHTML = `<strong>${derivada}</strong>`;

    // Interpretación
    let interpretacion = `Producir <strong>${xOptimo.toFixed(2)}</strong> unidades minimiza los costos totales en <strong>$${costoMinimo.toFixed(2)}</strong>. `;
    if (xOptimo > 0) {
        interpretacion += `Esta es la cantidad óptima de producción según el modelo de costos cuadrático.`;
    } else {
        interpretacion += `Nota: El punto crítico está fuera del dominio económico positivo.`;
    }
    document.getElementById('interpretacion').innerHTML = interpretacion;

    // Mostrar resultados
    document.getElementById('resultados').classList.remove('hidden');

    // Graficar
    graficarFuncion(a, b, c, xOptimo, costoMinimo);
}

function graficarFuncion(a, b, c, xOptimo, yOptimo) {
    const ctx = document.getElementById('grafica');

    if (chartInstance) {
        chartInstance.destroy();
    }

    const xValues = [];
    const yValues = [];
    const minX = Math.max(0, xOptimo - 30);
    const maxX = xOptimo + 30;

    for (let x = minX; x <= maxX; x += 0.5) {
        xValues.push(x);
        yValues.push(a * x * x + b * x + c);
    }

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                label: 'C(x) = ax² + bx + c',
                data: yValues,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true, position: 'top' },
                tooltip: { mode: 'index', intersect: false }
            },
            scales: {
                x: { title: { display: true, text: 'Unidades producidas (x)' } },
                y: { title: { display: true, text: 'Costo Total C(x)' } }
            },
            elements: {
                point: {
                    radius: 0
                }
            }
        }
    });

    // Añadir punto óptimo (simulado con dataset extra si se quiere, pero por simplicidad se muestra en tooltip)
}