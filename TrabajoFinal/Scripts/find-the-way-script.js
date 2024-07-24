// Importaciones nombradas de las clases
import { Graph, NodeGraph } from './Model/graph.js';
import { paintPath, clearTableColors } from './functions/utils.js';
import { recursivity } from './functions/recrusivity.js';
import { cache } from './functions/cache.js';
import { bfs } from './functions/bfs.js';
import { dfs } from './functions/dfs.js';

document.addEventListener('DOMContentLoaded', () => {
    const graph = new Graph(); // Iniciamos el grafo
    let startNode = null; 
    let endNode = null; 

    // Obtiene las dimensiones de la tabla desde los parámetros de URL
    const urlParams = new URLSearchParams(window.location.search);
    const rows = parseInt(urlParams.get('rows'), 10) || 10; // Base 10 pq es decimal, En caso de que no haya valor defecto=10
    const columns = parseInt(urlParams.get('columns'), 10) || 10;

    const table = document.getElementById('generatedTable');
    if (!table) {
        console.error('No se pudo encontrar el elemento de la tabla.');
        return;
    }

    // Crea la tabla con nodos
    for (let i = 0; i < rows; i++) {
        const row = table.insertRow();
        for (let j = 0; j < columns; j++) {
            const cell = row.insertCell();
            const node = graph.addNode(`${i}-${j}`); // Añadimos los nodos a los grafos
            cell.textContent = `${i + 1}, ${j + 1}`;
            cell.dataset.node = node;
            node.element = cell; // Nodo= celda para crear los recorridos
            cell.addEventListener('click', () => { // Click para definir celdas transitables y no transitables
                if (cell.style.backgroundColor === 'red') {
                    cell.style.backgroundColor = '';
                    node.transitable = true;
                } else {
                    cell.style.backgroundColor = 'red';
                    node.transitable = false;
                }
            });
        }
    }

    // Conecta los nodos en el grafo
    for (let i = 0; i < rows; i++) {
        // Formula calculo indices nodos index=(i−1)×columns+j
        for (let j = 0; j < columns; j++) {
            const node = graph.nodes[i * columns + j];
            if (i > 0) graph.addEdge(node, graph.nodes[(i - 1) * columns + j]); // Arriba
            if (i < rows - 1) graph.addEdge(node, graph.nodes[(i + 1) * columns + j]); // Abajo
            if (j > 0) graph.addEdge(node, graph.nodes[i * columns + (j - 1)]); // Izquierda 
            if (j < columns - 1) graph.addEdge(node, graph.nodes[i * columns + (j + 1)]); // Derecha
        }
    }

    // Maneja el formulario para establecer nodos de inicio y fin
    document.getElementById('coordinatesForm').addEventListener('submit', event => {
        event.preventDefault();
        // Pedirá columnas y filas de inicio y fin para saber exactamente dónde empieza
        const startRow = parseInt(document.getElementById('startRow').value, 10) - 1;
        const startColumn = parseInt(document.getElementById('startColumn').value, 10) - 1;
        const endRow = parseInt(document.getElementById('endRow').value, 10) - 1;
        const endColumn = parseInt(document.getElementById('endColumn').value, 10) - 1;

        if (startNode) {
            startNode.element.style.backgroundColor = '';
        }
        if (endNode) {
            endNode.element.style.backgroundColor = '';
        }

        startNode = graph.nodes[startRow * columns + startColumn];
        endNode = graph.nodes[endRow * columns + endColumn];

        startNode.element.style.backgroundColor = 'green';
        endNode.element.style.backgroundColor = 'green';
    });

    // Maneja la ejecución de algoritmos de búsqueda
    function handleSearchAlgorithm(algorithm) {
        clearTableColors(); // Limpia los colores de la tabla
        if (startNode && endNode) { // Comprobar si ambos nodos están definidos
            const delay = document.getElementById('delay').checked; // Obtiene el estado del checkbox de delay
            let path = [];
            let executionTime;

            if (algorithm === 'bfs') {
                const startTime = performance.now();
                path = bfs(startNode, endNode);
                executionTime = performance.now() - startTime;
                document.getElementById('bfsTime').textContent = `${executionTime.toFixed(4)} ms`;
            } else if (algorithm === 'dfs') {
                const startTime = performance.now();
                path = dfs(startNode, endNode);
                executionTime = performance.now() - startTime;
                document.getElementById('dfsTime').textContent = `${executionTime.toFixed(4)} ms`;
            } else if (algorithm === 'recursivity') {
                const startTime = performance.now();
                path = recursivity(startNode, endNode);
                executionTime = performance.now() - startTime;
                document.getElementById('recursivityTime').textContent = `${executionTime.toFixed(4)} ms`;
            } else if (algorithm === 'cache') {
                const startTime = performance.now();
                path = cache(startNode, endNode);
                executionTime = performance.now() - startTime;
                document.getElementById('cacheTime').textContent = `${executionTime.toFixed(4)} ms`;
            }

            if (path.length > 0) {
                // Ajusta las coordenadas en el path para que comiencen en 1
                const pathString = path
                    .map(node => {
                        if (node) {
                            const [row, col] = node.value.split('-').map(Number);
                            return `${row + 1}-${col + 1}`;
                        } else {
                            return 'undefined';
                        }
                    })
                    .join(' -> ');

                // Muestra el camino ajustado en un alert
                alert(`Camino encontrado: ${pathString}`);
                
                paintPath(path, startNode, endNode, delay); // Dibuja el camino en la tabla
            } else {
                alert('No se encontró ningún camino.');
            }
        }
    }

    // Asigna eventos a los botones para ejecutar los algoritmos de búsqueda
    document.getElementById('btnBFS').addEventListener('click', () => handleSearchAlgorithm('bfs'));
    document.getElementById('btnDFS').addEventListener('click', () => handleSearchAlgorithm('dfs'));
    document.getElementById('btnRecursivity').addEventListener('click', () => handleSearchAlgorithm('recursivity'));
    document.getElementById('btnCache').addEventListener('click', () => handleSearchAlgorithm('cache'));

    // Funcionalidad botón reset
    document.getElementById('btnReset').addEventListener('click', () => {
        clearTableColors();
        if (startNode) {
            startNode.element.style.backgroundColor = 'green';
        }
        if (endNode) {
            endNode.element.style.backgroundColor = 'green';
        }

        // Reinicia los valores de tiempo en la sección time-section
        document.getElementById('bfsTime').textContent = '0.0000 ms';
        document.getElementById('dfsTime').textContent = '0.0000 ms';
        document.getElementById('recursivityTime').textContent = '0.0000 ms';
        document.getElementById('cacheTime').textContent = '0.0000 ms';
    });
});
