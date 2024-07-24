# Trabajo Final

**Integrantes:** Karina Garcia y Diego Rivera  
**Profesor:** Ing. Pablo Torres

![Logo universidad](infor-images/logo-ups.jpg)
# Marco Teórico

## 1. Teoría de Grafos
La teoria de grafos tiene origen matematico, y no informatico, sirve para resolver varios problemas matematicos e informaticos gracias.
Un grafo es un conjunto de nodos que se relacionan entre si atraves de objetos conocidos como aristas, esta mecanica es usada para resolver problemas complejos en el area de matemticas discretas, ciencias sociales e informaticas
![Grafo](infor-images/graph-model.jpg)

### 1.1. Nodos y Aristas

- **Nodos (Vértices)**: Son los puntos de un grafo que representan entidades o elementos del sistema.
- **Aristas (Bordes)**: Son las conexiones entre nodos que representan las relaciones o caminos posibles entre ellos.

### 1.2. Tipos de Grafos

- **Grafos Dirigidos**: Las aristas tienen una dirección, indicando un camino unidireccional.
- **Grafos No Dirigidos**: Las aristas no tienen dirección, indicando una conexión bidireccional.
- **Grafos Ponderados**: Las aristas tienen un peso o costo asociado, representando la "distancia" o el "costo" de la conexión.

## 2. Algoritmos de Búsqueda en Grafos

Hay dos principales algoritmos de busqeueda en los grafos que son BFS(Amplitud) y DFS(Profundidad), cada una usando distintas estructuras para poder recorrer el grafo de la manera deseada conociendo los nodos del grafo entendiendo que el nodo actual sera padre del siguiente nodo(Nodo vecino)

### 2.1. Búsqueda en Amplitud (BFS)

- **Descripción**: BFS explora los nodos nivel por nivel, comenzando desde el nodo de origen. Utiliza una cola(estructura fifo) para almacenar los nodos a explorar.
- **Aplicaciones**: Ideal para encontrar el camino más corto en grafos no ponderados y para problemas de niveles o capas en grafos.

### 2.2. Búsqueda en Profundidad (DFS)

- **Descripción**: DFS explora tan profundo como sea posible en una rama antes de retroceder y explorar otras ramas utiliza una pila (Respeta el orden de entrada y salida) para mantener el rastro de los nodos visitados.
- **Aplicaciones**: Útil para encontrar caminos en grafos dirigidos y no dirigidos, y para resolver problemas de conectividad y ciclos en grafos.

## 3. Algoritmos de Búsqueda Adicionales

Además de BFS y DFS hay otra manera para solucionar este problema y es usando la recursividad y la programacion dinamica 

### 3.1. Recursividad

- **Descripción**: Utiliza recursividad para recorrer los distintos caminos que hay en el grafo, va a repetirse este proceso hasta que se llegue al caso base de la funcion recursiva que en este caso es que la celda de inicio sea igual a la celda del final. A veces es mas eficaz pero otras veces puede tomar mas tiempo que BFS y DFS
### 3.2. Programación Dinámica con Caché

- **Descripción**: Utilizando programacion dinamica se encuentra un camino recorriendo todo el grafo, pero para encontrar dicho camino se recorren todos los nodos viendo si sale factible o no pasar por ellos en el camino final, haciendo esto se evita recorrer nodos que no sean necesarios o nodos ya visitados
### 4.2. Medición de Tiempo

- **Descripción**:Para evaluar el rendimiento de los algoritmos, se mide el tiempo de ejecución utilizando `performance.now()`. Esto se realiza para poder visualozar la diferencia de tiempo de cada algoritmo para posteriormente compararlas y ver su eficacia

# Desarrollo
Principalmente para resolver este problema se planteo usar html y js debido a que se lo considero la manera mas eficaz y versatil para poder realizar la interfaz grafica y juntarla con el backend utilizando componentes basicos de html para realizar la interfaz

## Index.html 
![index](infor-images/index.png)
En el index esta un header con los datos de los autores el proyecto y del docente, posteriormente esta un formulario que solicita al usuario que ingrese las medidas que desea del tablero
[datos recibidos](infor-images/table-script-1.png)
![generando la table](infor-images/table-script2.png)
Luego se procesa los datos en estos dos scripts, el uno recoge los datos y el otro obtiene los datos para pocersarlos y poder convertirlo en una table, pero para la solucion de este problema se necesita grafos asi que pasaremos las celdas a nodos y la tabla sera un grafo.
![conviertiendo a grafo y nodos](infor-images/table-script3.png)
Luego se debe conectar los nodos entre si para poder relacionarlos y poder encontrar los caminos que necesitemos 
![Relacionando nodos](infor-images/table-script4.png)
## labyrint.html
Despues de haber generado la table y los grafos con las especificaciones del usuario se dirige al labyrint.html donde esta las ultimas funcionalidades del programa 
![Segunda pagina](infor-images/labyrinth.png)
Se muestra la tabla generada ademas de un formulario donde se le pediran las coordenadas de inicio y fin al usuario, ademas de los botnes con su respectiva funcion , la funcion delay y al final el tiempo que cada uno tomo, ademas de la funcionalidad de hacer click sobre una celda para hacerla no transitable, y las celdas que recorrieron mandando como alerta al usuario.
Concentrandonos en la tabla 
![Formulario inicio y fin](infor-images/labyrinth2.png)
Pinta las celdas cde verde ademas de guardar su valor en las respectivas variables 
Posteriormente definimos los algoritmos para poder ejecutralos al momento de dar click a los botones, para mandar las coordenadas como argumento y poder encontrar el camino entre las celdas respetandp las que no son transitbles
![Algoritmos](infor-images/handleSearch.png)
Luego con un map colocamos las coordenadas que le salgan como un alert al usuario
![map](infor-images/alert.png)
Cada algoritmo tiene su clase, ahora compararemos los resultados obtenidos usando un ejemplo practico
![BFS](infor-images/resultadoBFS.png)
![DFS](infor-images/resultadoDFS.png)
![Recursividad](infor-images/resultadosRecursividad.png)
![Cache](infor-images/ResultadoCAche.png)

# COnclusiones
EL algoritmo BFS es ek mas eficiente, pero en laberintos pequeños y donde la celda de llegada este de manera horizonal a la de salida no tiene mucha diferencia con el dfs , en algunos casos es el mismo tiempo debido a la mecanica con la que recorren el grafo, mientras que el de recursividad es mas veloz mientras mas celdas no transitables alla debido a que las evade y sigue buscando llegar a su caso base, la que no tiene mucha varianza es el cache, pero no lo veo muy efectivo sobre todo pq el codigo con todos los conceptos de cache y prgramacion dinamica no se pudo ejecutar debido a que al momentp de recrear el camino el sistema fallaba 