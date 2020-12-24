# Practica-3: Introducción a JavaScript. World Cup Simulator
Para consolidar mis conocimientos de JavaScript, tendré que desarrollar un **simulador de la copa del mundo de fútbol**.
Para los que no estén muy familiarizados con el deporte rey, se explicará a continuación el funcionamiento.
El campeonato del mundo de fútbol lo disputan 32 equipos nacionales de fútbol y consta de dos fases: la fase de grupos y la fase de eliminatorias. 

## Fase grupos (opcional)
Estos 32 equipos se agrupan en 8 grupos de 4 equipos cada uno. Aunque en realidad hay reglas sobre cómo los equipos se distribuyen en los grupos, para esta práctica se ignorarán. Los grupos se nombran por letras en orden alfabético, desde la A hasta la H.
Repartiremos los 32 equipos aleatoriamente en los 8 grupos. Para cada grupo, se jugará una liga de una sola vuelta, enfrentando a todos los equipos del grupo entre ellos. Tras jugar todos los partidos entre los equipos, tan sólo los dos primeros equipos de cada grupo se clasificarán para la fase de eliminatorias, es decir que se clasificarán 16 equipos. 

**Restricciones de la fase de grupos:**
* Los equipos se distribuirán en los grupos de manera aleatoria.
* En cada grupo, todos los equipos deberán jugar entre sí.
* La victoria supondrá ganar 3 puntos, el empate 1 y la derrota 0.
* La clasificación de la fase de grupos se realizará bajo los siguiente criterios:
* Los equipos se ordenarán en función de los puntos ganados descendentemente (primero el que más puntos tenga).
* En caso de empate a puntos, será primero el equipo que haya ganado al otro en el enfrentamiento entre ambos.
* En caso de empate también en la diferencia de goles, será primero el equipo por orden alfabético (vaya putada para Zimbabue).
**IMPORTANTE: Ésta parte es opcional. Para obtener un APTO en la pŕactica se deberá desarrollar, al menos, la fase de eliminatorias (play off) descrita a continuación.**

## Fase de eliminatorias (playoff)
La fase de eliminatorias la jugarán los 16 mejores equipos de la fase de grupos (los dos primeros de cada grupo), en caso de implementar la fase de grupos (opcional). De no implementar la fase de grupos, serán 16 equipos seleccionados aleatoriamente.
**Restricción:** en la fase de eliminatorias no puede haber empates. En caso de empates, se deberá jugar hasta que un equipo finalmente gane. La segunda ronda de la fase de eliminatorias (cuartos de final) enfrentará a los 8 equipos ganadores de los partidos de la ronda anterior (octavos de final). Los ganadores de estos partidos pasarán a la siguiente ronda (semifinales).
Los equipos ganadores de las semifinales, pasarán a la final y los equipos perdedores jugarán un partido para establecer el tercer y cuarto puesto de la clasificación.
**Restricciones sólo si implementas la fase de grupos:**
1. Los enfrentamientos de la primera ronda de la fase de eliminatorias (octavos de final), será cruzando los primeros de grupo contra los segundos de grupo entre grupos contiguos (Grupo A vs Grupo B, Grupo C vs Grupo D, etc.).
**Ejemplo:**
Grupo A:
1º Uzbekistán
2º Vietnam
Grupo B:
1º Zimbabue
2º Jamaica
Los enfrentamientos serían: Uzbekistán vs Jamaica y Zimbabwe vs Vietnam.

2. Dos equipos que se hayan encontrado en la fase de grupos, no podrán volver a encontrarse en la fase de eliminatorias hasta la final. Para garantizar esto, los primeros equipos de los grupos A, B, C y D y los segundos equipos de los grupos E, F, G y H, irán por un lado de del cuadro, y los primeros equipos de los grupos E, F, G y H y los segundos equipos de los grupos A, B, C y D irán
por otro lado del cuadro.

## Requisitos del programa mínimo
* El programa comenzará indicando con un mensaje que “comienza el torneo”.
* El programa deberá mostrar los 16 equipos participantes en la fase de eliminatorias (play off).
* A continuación se deberán mostrar los resultados de los partidos en las diferentes rondas (octavos de final, cuartos de final y semifinales), indicando qué equipos se clasifican para la siguiente ronda (esto se mostrará desde octavos de final hasta semifinales).
* **Opcional**: Una vez finalizadas las semifinales, se mostrará el resultado del partido de tercer y cuarto puesto (que se juega entre equipos no clasificados para la final).
* Tras esto, se mostrará el resultado del partido de la final, anunciando posteriormente el equipo ganador como campeón del mundo.

## Requisitos con la fase de grupos
* Al arrancar el programa se deberá mostrar por pantalla la información de los equipos que hay en cada grupo y la planificación de partidos del mismo.
  * Nombre del grupo
  * Listado de los equipos (una en cada línea)
* La asignación de los equipos a cada grupo se realizará de manera aleatoria.
* Después se anunciará con un texto el comienzo del torneo
* A continuación se mostrarán los resultados de los partidos y la clasificación de cada grupo tras el final de la primera jornada de partidos, después los de la segunda jornada, y finalmente los de la tercera jornada.
* Una vez finalice la fase de grupos, se deberán anunciar el comienzo de la fase de eliminatorias.
* A partir de aquí, se continuaría con los requisitos del programa mínimo.

Ejemplo de salida del programa:
Grupos y equipos
===============================
Grupo A
-----------------------
España
Zimbabue
Ecuador
Vietnam
Jornada 1:
- España vs Vietnam
- Zimbabue vs Ecuador
Jornada 2:
- Vietnam vs Zimbabue
- Ecuador vs España
Jornada 3:
- Ecuador vs Vietnam
- España vs Zimbabue
Grupo B
-----------------------
Brasil
Australia
Jamaica
Nigeria
Jornada 1:
- Brasil vs Nigeria
- Australia vs Jamaica
Jornada 2:
- Nigeria vs Australia
- Jamaica vs Brasil
Jornada 3:
- Jamaica vs Nigeria
- Brasil vs Australia
[resto de grupos y equipos]
===============================================
============== COMIENZA EL MUNDIAL ============
===============================================
Grupo A - Jornada 1:
----------------------------
España 2 - 0 Vietnam
Zimbabue 1 - 1 Ecuador
Grupo B - Jornada 1:
----------------------------
Brasil 2 - 0 Nigeria
Australia 1 - 1 Jamaica
(index) Equipo Puntos Goles a favor Goles en contra Diferencia goles
0 España 3 2 0 2
1 Ecuador 1 1 1 0
2 Zimbabue 1 1 1 0
3 Vietnam 0 0 2 -2
(index) Equipo Puntos Goles a favor Goles en contra Diferencia goles
0 Brasil 3 2 0 2
1 Australia 1 1 1 0
2 Jamaica 1 1 1 0
3 Nigeria 0 0 2 -2
[resto de grupos y equipos]
Grupo A - Jornada 2:
----------------------------
Vietnam 5 - 0 Zimbabue
Ecuador 2 - 2 España
[resto de grupos y equipos]
===============================================
===== COMIENZO DE LA FASE DE ELIMINATORIAS ======
===============================================
===== OCTAVOS DE FINAL =====
Brasil 1 - 3 Ecuador => Ecuador
Japón 5 - 1 Francia => Japón
EEUU 9 - 3 Inglaterra => EEUU
Argentina 8 - 2 Holanda => Argentina
Alemania 3 - 4 Islas Feroe => Islas Feroe
España 2 - 1 Jamaica => España
Portugal 3 - 5 Polonia => Portugal
Suecia 1 - 2 Finlandia => Finlandia
===== CUARTOS DE FINAL =====
Ecuador 1 - 3 Japón => Japón
EEUU 5 - 1 Argentina => EEUU
Islas Feroe 8 - 10 España => España
Portugal 3 - 4 Finlandia => Finlandia
===== SEMIFINALES =====
Japón 1 - 3 EEUU => EEUU
España 5 - 1 Finlandia => España
===== TERCER Y CUARTO PUESTO =====
Japón 1 - 3 Finlandia => Finlandia
===== FINAL =====
España 5 - 1 EEUU => España
===============================================
(index) Equipo Puntos Goles a favor Goles en contra Diferencia goles
0 España 4 4 2 2
1 Vietnam 3 5 2 3
2 Ecuador 2 3 3 0
3 Zimbabue 1 1 5 -4
¡España campeón del mundo!
===============================================
