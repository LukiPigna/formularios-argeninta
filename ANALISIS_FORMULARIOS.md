# ANÁLISIS DETALLADO DE FORMULARIOS EXCEL

## ARCHIVO 1: Planilla-de-Anticipos-y-Rendiciones-Enero-2026.xlsx

### 1. Nombre del formulario
**Solicitud de Anticipo de Fondos / Viáticos**

Formulario para gestionar solicitudes de anticipos de fondos y viáticos, y posterior rendición de los mismos. Permite solicitar adelanto de dinero para gastos de proyectos y luego rendir los gastos efectivamente realizados.

### 2. Listado completo de campos

#### SECCIÓN 1: Datos Generales de la Solicitud

**1.1 Información del Proyecto**
- **Código de Proyecto**: Texto (tipo lista desplegable) - OBLIGATORIO
  - Usa validación de datos con referencia a "comp" (tabla de proyectos)
  - Selecciona de un listado de proyectos financiados
- **Fuente de Financiamiento**: Texto (automático) - CALCULADO
  - Formula: `=+VLOOKUP($C$5,tabla,2,0)`
  - Se autocompleta según el código de proyecto seleccionado
- **Institución a la que se afecta el gasto**: Texto libre - OBLIGATORIO
- **Descripción de la actividad a desarrollar**: Texto largo (multilínea) - OBLIGATORIO

**1.2 Datos del Beneficiario**
- **Beneficiario del Anticipo**: Texto libre - OBLIGATORIO
- **CUIT / CUIL del Beneficiario**: Número (formato XX-XXXXXXXX-X) - OBLIGATORIO
- **E-mail de contacto del Beneficiario**: Email (validación de formato) - OBLIGATORIO

#### SECCIÓN 2: Detalle del Anticipo Solicitado

**2.1 Tabla de Conceptos del Anticipo**
Estructura de tabla (filas 14-17, columnas A-E):

- **Concepto del gasto**: Texto libre - OBLIGATORIO
- **Partida Presupuestaria**: Texto - OBLIGATORIO
- **Actividad**: Texto - OBLIGATORIO
- **Importe en Pesos**: Número (moneda) - OBLIGATORIO
- **Importe en USD / Euros**: Número (moneda) - OPCIONAL

**Cálculo automático:**
- **TOTAL Importe en Pesos**: Formula `=SUM(D14:D17)` - AUTOMÁTICO
- **TOTAL Importe en USD / Euros**: Formula `=SUM(E14:E17)` - AUTOMÁTICO

#### SECCIÓN 3: Datos Bancarios

- **Adjuntar Constancia de Datos Bancarios**: Texto instructivo - REQUISITO DE ARCHIVO

#### SECCIÓN 4: Rendición de Anticipo

**4.1 Tabla de Comprobantes de Gastos**
Estructura de tabla (filas 27-32, columnas A-H):

- **Concepto del Comprobante**: Texto libre - OBLIGATORIO
- **Partida Presupuestaria**: Texto - OBLIGATORIO
- **Actividad**: Texto - OBLIGATORIO
- **Importe en Pesos**: Número (moneda) - OBLIGATORIO
- **Importe en USD / Euros**: Número (moneda) - OPCIONAL
- **Importe en otra Moneda Extranjera**: Número (moneda) - OPCIONAL
- **Número de orden de Comprobante**: Texto - OBLIGATORIO
- **Fecha del Comprobante**: Fecha - OBLIGATORIO

**Cálculos automáticos:**
- **Monto rendido (Pesos)**: Formula `=SUM(D27:D32)` - AUTOMÁTICO
- **Monto rendido (USD/Euros)**: Formula `=SUM(E27:E32)` - AUTOMÁTICO
- **Monto rendido (Otra moneda)**: Formula `=SUM(F27:F32)` - AUTOMÁTICO

**4.2 Comparación Anticipo vs Rendición**

- **Monto del anticipo**:
  - En Pesos: Formula `=+D18` (hereda del total de la sección 2)
  - En USD/Euros: Formula `=+E18` (hereda del total de la sección 2)

- **Complemento a pagar al beneficiario**:
  - En Pesos: Formula `=IF(D33-D34>0,D33-D34,0)` - AUTOMÁTICO
  - En USD/Euros: Formula `=IF(E33-E34>0,E33-E34,0)` - AUTOMÁTICO
  - Lógica: Si el monto rendido es mayor al anticipado, se paga el excedente

- **Devolución por parte del beneficiario**:
  - En Pesos: Formula `=IF(D34-D33>0,D34-D33,0)` - AUTOMÁTICO
  - En USD/Euros: Formula `=IF(E34-E33>0,E34-E33,0)` - AUTOMÁTICO
  - Lógica: Si el monto anticipado es mayor al rendido, se devuelve el excedente
  - Texto instructivo: "(adjuntar comprobante transferencia)"

#### SECCIÓN 5: Liquidación de Viáticos (CONDICIONAL)

**Instrucción**: "Completar solo para Viáticos"

**5.1 Datos de Viaje**
- **Origen**: Texto libre - OBLIGATORIO (si aplica)
- **Destino**: Texto libre - OBLIGATORIO (si aplica)
- **Valor diario (Pesos)**: Número (moneda) - OBLIGATORIO (si aplica)
- **Valor diario (USD/Euros)**: Número (moneda) - OBLIGATORIO (si aplica)

**5.2 Cálculo de Viáticos**
- **Liquidación de Viáticos en PESOS**: Formula `=+D41*D43` - AUTOMÁTICO
- **Liquidación de Viáticos en USD / Euros**: Formula `=+E41*E43` - AUTOMÁTICO

**5.3 Datos Adicionales**
- **Medio de Transporte**: Texto libre - OBLIGATORIO (si aplica)

### 3. Lógica condicional

**Campos condicionales identificados:**
1. **Sección "Liquidación de Viáticos"** (filas 39-46): Solo se completa cuando se trata de viáticos, no de fondos generales
2. **Cálculo de complemento vs devolución**: Los campos D35/E35 (complemento) y D36/E36 (devolución) son mutuamente excluyentes:
   - Si D33-D34 > 0: Se muestra complemento (el beneficiario gastó más de lo anticipado)
   - Si D34-D33 > 0: Se muestra devolución (el beneficiario gastó menos de lo anticipado)
   - Ambos pueden ser 0 si coincide exactamente (rendición 0)

### 4. Campos de carga de archivos o adjuntos

- **"Adjuntar Constancia de Datos Bancarios"**: Campo instructivo que indica requerimiento de documento adjunto
- **"Devolución por parte del beneficiario (adjuntar comprobante transferencia)"**: Indica que se debe adjuntar comprobante de transferencia cuando corresponda devolver dinero

### 5. Campos de firma o aprobación

**No se detectaron campos de firma explícitos** en la hoja principal del formulario. Sin embargo, el archivo contiene hojas adicionales que pueden incluir secciones de firma:
- Hoja "Ficha ident. Financiera" contiene campo "FIRMA DEL TITULAR DE LA CUENTA"
- Hoja "Informe de actividades" puede tener campos de aprobación

### 6. Secciones o bloques temáticos (Total: 5)

1. **Encabezado y Datos Generales**: Identificación del proyecto y beneficiario
2. **Detalle del Anticipo Solicitado**: Tabla de conceptos del anticipo
3. **Datos Bancarios**: Instrucciones para adjuntar constancia bancaria
4. **Rendición de Anticipo**: Tabla de comprobantes y cálculos comparativos
5. **Liquidación de Viáticos (Condicional)**: Datos específicos para viajes

### 7. Fórmulas o cálculos automáticos

**Total de fórmulas detectadas: 14**

**Fórmulas de VLOOKUP (búsqueda):**
1. `=+VLOOKUP($C$5,tabla,2,0)` en C6: Busca la fuente de financiamiento según código de proyecto

**Fórmulas de SUMA (totales):**
2. `=SUM(D14:D17)` en D18: Total del anticipo en pesos
3. `=SUM(E14:E17)` en E18: Total del anticipo en USD/Euros
4. `=SUM(D27:D32)` en D33: Total rendido en pesos
5. `=SUM(E27:E32)` en E33: Total rendido en USD/Euros
6. `=SUM(F27:F32)` en F33: Total rendido en otras monedas

**Fórmulas de COPIA (referencias):**
7. `=+D18` en D34: Copia el total del anticipo en pesos
8. `=+E18` en E34: Copia el total del anticipo en USD/Euros

**Fórmulas condicionales (IF):**
9. `=IF(D33-D34>0,D33-D34,0)` en D35: Calcula complemento en pesos
10. `=IF(E33-E34>0,E33-E34,0)` en E35: Calcula complemento en USD/Euros
11. `=IF(D34-D33>0,D34-D33,0)` en D36: Calcula devolución en pesos
12. `=IF(E34-E33>0,E34-E33,0)` en E36: Calcula devolución en USD/Euros

**Fórmulas de MULTIPLICACIÓN:**
13. `=+D41*D43` en D45: Calcula liquidación de viáticos en pesos (días × valor diario)
14. `=+E41*E43` en E45: Calcula liquidación de viáticos en USD/Euros (días × valor diario)

### 8. Observaciones

**Aspectos complejos o destacables:**

1. **Validación de datos compleja**: El campo "Código de Proyecto" usa una validación tipo "list" que referencia a un rango nombrado "comp", lo que permite seleccionar de un listado predefinido de proyectos

2. **Sistema de autocompletado**: La "Fuente de Financiamiento" se autocompleta automáticamente mediante VLOOKUP a partir del código de proyecto seleccionado, asegurando consistencia

3. **Cálculo inteligente de rendición**: Las fórmulas IF calculan automáticamente si corresponde pagar un complemento o solicitar una devolución, basándose en la diferencia entre monto anticipado y monto rendido

4. **Manejo de múltiples monedas**: El formulario soporta simultáneamente pesos argentinos, USD/Euros y otras monedas extranjeras, con cálculos paralelos para cada tipo de moneda

5. **Estructura de hojas auxiliares**: El archivo contiene 6 hojas:
   - "Formul. Anticipos y Rendiciones": Formulario principal
   - "Listado": Tabla maestra de 140 proyectos con códigos, descripciones y financiamientos
   - "Info Relevante": Instrucciones detalladas sobre anticipos y rendiciones
   - "Informe de actividades": Formulario complementario para reportar actividades
   - "Ficha ident. Financiera": Formulario de datos bancarios internacionales
   - "Tablas": Tablas de referencia para rubros presupuestarios y validaciones

6. **Fórmulas masivas en hoja "Listado"**: Esta hoja contiene 280 fórmulas (2 por cada uno de los 140 proyectos):
   - Columna E: `=CONCATENATE(Ai," - ",Bi)` - Concatena código y descripción
   - Columna F: `=+Ci` - Copia el financiamiento

7. **Celdas combinadas extensas**: Uso significativo de celdas combinadas para títulos y etiquetas largas, lo que puede complicar la migración a sistemas digitales

8. **Sin validaciones de tipo de dato**: No se detectaron validaciones de formato para campos como email, CUIT/CUIL, fechas, etc., más allá de la lista desplegable para proyectos

---

## ARCHIVO 2: Planilla-de-Reintegros-2026.xlsx

### 1. Nombre del formulario
**Reintegro de Gastos / Viáticos**

Formulario para gestionar solicitudes de reintegro de gastos ya realizados. A diferencia del formulario de anticipos, en este caso el beneficiario ya ha gastado el dinero y solicita el reembolso posterior.

### 2. Listado completo de campos

#### SECCIÓN 1: Datos Generales del Reintegro

**1.1 Información del Proyecto**
- **Código de Proyecto**: Texto (tipo lista desplegable) - OBLIGATORIO
  - Usa validación de datos con referencia a "comp" (tabla de proyectos)
  - Selecciona de un listado de proyectos financiados
- **Fuente de Financiamiento**: Texto (automático) - CALCULADO
  - Formula: `=VLOOKUP(C4,tabla,2,0)`
  - Se autocompleta según el código de proyecto seleccionado
- **Institución a la que se afecta el gasto**: Texto libre - OBLIGATORIO
- **Descripción de la actividad a desarrollar**: Texto largo (multilínea) - OBLIGATORIO

**1.2 Datos del Beneficiario**
- **Beneficiario del Anticipo**: Texto libre - OBLIGATORIO
  - *Nota: Aunque dice "Anticipo", en el contexto de reintegros se refiere al beneficiario del reintegro*
- **CUIT / CUIL del Beneficiario**: Número (formato XX-XXXXXXXX-X) - OBLIGATORIO
- **E-mail de contacto del Beneficiario**: Email (validación de formato) - OBLIGATORIO

#### SECCIÓN 2: Detalle de Gastos a Reintegrar

**2.1 Tabla de Comprobantes**
Estructura de tabla (filas 14-19, columnas A-H):

- **Concepto del Comprobante**: Texto libre - OBLIGATORIO
- **Partida Presupuestaria**: Texto - OBLIGATORIO
- **Actividad**: Texto - OBLIGATORIO
- **Importe en Pesos**: Número (moneda) - OBLIGATORIO
- **Importe en USD / Euros**: Número (moneda) - OPCIONAL
- **Importe en otra Moneda Extranjera**: Número (moneda) - OPCIONAL
- **Número de orden de Comprobante**: Texto - OBLIGATORIO
- **Fecha del Comprobante**: Fecha - OBLIGATORIO

**Cálculo automático:**
- **Monto a reintegrar**:
  - En Pesos: Formula `=SUM(D14:D19)` - AUTOMÁTICO
  - En USD / Euros: Formula `=SUM(E14:E19)` - AUTOMÁTICO
  - En Otra Moneda: Formula `=SUM(F14:F19)` - AUTOMÁTICO

#### SECCIÓN 3: Datos Bancarios

- **Adjuntar Constancia de Datos Bancarios**: Texto instructivo - REQUISITO DE ARCHIVO

#### SECCIÓN 4: Liquidación de Viáticos (CONDICIONAL)

**Instrucción**: "Completar solo para Viáticos"

**4.1 Datos de Viaje**
- **Origen**: Texto libre - OBLIGATORIO (si aplica)
- **Destino**: Texto libre - OBLIGATORIO (si aplica)
- **Valor diario (Pesos)**: Número (moneda) - OBLIGATORIO (si aplica)
- **Valor diario (USD/Euros)**: Número (moneda) - OBLIGATORIO (si aplica)

**4.2 Fechas del Viaje**
- **Fecha Origen**: Fecha - OBLIGATORIO (si aplica)
- **Fecha Finalización**: Fecha - OBLIGATORIO (si aplica)

**4.3 Cálculo de Días**
- **Cantidad de días solicitados (Pesos)**: Número entero - OBLIGATORIO (si aplica)
- **Cantidad de días solicitados (USD/Euros)**: Número entero - OBLIGATORIO (si aplica)

**4.4 Horas del Viaje**
- **Hora Origen**: Hora - OBLIGATORIO (si aplica)
- **Hora Finalización**: Hora - OBLIGATORIO (si aplica)
- **Monto liquidado (Pesos)**: Formula `=+D26*D28` - AUTOMÁTICO
- **Monto liquidado (USD/Euros)**: Formula `=+E26*E28` - AUTOMÁTICO

**4.5 Datos Adicionales**
- **Medio de Transporte**: Texto libre - OBLIGATORIO (si aplica)
- **Moneda de pago**: Texto libre - OBLIGATORIO (si aplica)

### 3. Lógica condicional

**Campos condicionales identificados:**
1. **Sección "Liquidación de Viáticos"** (filas 24-31): Solo se completa cuando se trata de reintegro de viáticos, no de gastos generales

2. **Campos de cálculo automático**: Los campos D30 y E30 calculan automáticamente el monto liquidado multiplicando el valor diario por la cantidad de días

### 4. Campos de carga de archivos o adjuntos

- **"Adjuntar Constancia de Datos Bancarios"**: Campo instructivo que indica requerimiento de documento adjunto para efectuar el reintegro

### 5. Campos de firma o aprobación

**No se detectaron campos de firma explícitos** en la hoja principal del formulario. Sin embargo, el archivo contiene hojas adicionales que pueden incluir secciones de firma:
- Hoja "Ficha Ident. Financiera" contiene campo "FIRMA DEL TITULAR DE LA CUENTA"
- Hoja "Informe de Actividades" puede tener campos de aprobación

### 6. Secciones o bloques temáticos (Total: 4)

1. **Encabezado y Datos Generales**: Identificación del proyecto, beneficiario y actividad
2. **Detalle de Gastos a Reintegrar**: Tabla de comprobantes de gastos ya realizados
3. **Datos Bancarios**: Instrucciones para adjuntar constancia bancaria
4. **Liquidación de Viáticos (Condicional)**: Datos específicos para reintegro de viáticos

### 7. Fórmulas o cálculos automáticos

**Total de fórmulas detectadas: 6**

**Fórmulas de VLOOKUP (búsqueda):**
1. `=VLOOKUP(C4,tabla,2,0)` en C5: Busca la fuente de financiamiento según código de proyecto

**Fórmulas de SUMA (totales):**
2. `=SUM(D14:D19)` en D20: Total a reintegrar en pesos
3. `=SUM(E14:E19)` en E20: Total a reintegrar en USD/Euros
4. `=SUM(F14:F19)` en F20: Total a reintegrar en otras monedas

**Fórmulas de MULTIPLICACIÓN:**
5. `=+D26*D28` en D30: Calcula liquidación de viáticos en pesos (valor diario × días)
6. `=+E26*E28` en E30: Calcula liquidación de viáticos en USD/Euros (valor diario × días)

### 8. Observaciones

**Aspectos complejos o destacables:**

1. **Estructura simplificada**: Comparado con el formulario de anticipos, este formulario es más simple porque no tiene la sección de comparación entre anticipo y rendición. Solo calcula el total a reintegrar.

2. **Validación de datos similar**: Al igual que el formulario de anticipos, el campo "Código de Proyecto" usa una validación tipo "list" que referencia a un rango nombrado "comp"

3. **Sistema de autocompletado**: La "Fuente de Financiamiento" se autocompleta automáticamente mediante VLOOKUP a partir del código de proyecto seleccionado

4. **Manejo de múltiples monedas**: Al igual que el formulario de anticipos, soporta simultáneamente pesos argentinos, USD/Euros y otras monedas extranjeras

5. **Detalle temporal para viáticos**: Para reintegros de viáticos, se requiere más información temporal (fecha origen, fecha finalización, hora origen, hora finalización) que en el formulario de anticipos

6. **Estructura de hojas auxiliares**: El archivo contiene 6 hojas:
   - "Formulario de Reintegro": Formulario principal
   - "Listado": Tabla maestra de 140 proyectos (idéntica a la del otro archivo)
   - "Info Relevante": Instrucciones específicas sobre reintegros de fondos y viáticos
   - "Informe de Actividades": Formulario complementario para reportar actividades
   - "Ficha Ident. Financiera": Formulario de datos bancarios internacionales
   - "Tablas": Tablas de referencia para rubros presupuestarios y validaciones

7. **Fórmulas masivas en hoja "Listado"**: Esta hoja contiene 280 fórmulas (2 por cada uno de los 140 proyectos), idénticas a las del formulario de anticipos

8. **Diferencias clave vs formulario de anticipos**:
   - No tiene sección de "Detalle del Anticipo Solicitado"
   - No tiene cálculo de complemento/devolución
   - La tabla de comprobantes va directamente al cálculo del reintegro
   - Para viáticos, requiere fechas y horas específicas del viaje

9. **Terminología**: El campo "Beneficiario del Anticipo" mantiene el mismo nombre que en el formulario de anticipos, aunque en este contexto se trata de un beneficiario de reintegro, no de anticipo

10. **Sin validaciones de tipo de dato**: Al igual que el formulario de anticipos, no se detectaron validaciones de formato para campos como email, CUIT/CUIL, fechas, etc.

---

## COMPARACIÓN GENERAL ENTRE AMBOS FORMULARIOS

### Similitudes:
1. Ambos manejan el mismo catálogo de proyectos (hoja "Listado" idéntica)
2. Estructura similar en datos generales del proyecto y beneficiario
3. Soporte para múltiples monedas (Pesos, USD/Euros, otras divisas)
4. Ambos tienen sección condicional para viáticos
5. Ambos requieren constancia de datos bancarios
6. Ambos usan VLOOKUP para autocompletar la fuente de financiamiento
7. Ambos incluyen hojas auxiliares idénticas (Info Relevante, Informe de Actividades, Ficha Financiera, Tablas)

### Diferencias principales:
1. **Complejidad del formulario de anticipos**: Más complejo por el ciclo completo (solicitud → anticipo → rendición → cálculo de diferencias)
2. **Formulario de reintegros más simple**: Solo calcula el total a reintegrar, sin lógica de comparación
3. **Cálculos específicos**:
   - Anticipos: 14 fórmulas (incluye IF para complemento/devolución)
   - Reintegros: 6 fórmulas (solo sumas y multiplicaciones)
4. **Información temporal**: Reintegros de viáticos requieren más detalle temporal (fechas y horas exactas)

### Recomendaciones para implementación digital:
1. Implementar un catálogo de proyectos compartido entre ambos formularios
2. Crear componentes reutilizables para las secciones comunes (datos del proyecto, datos del beneficiario, liquidación de viáticos)
3. Implementar lógica condicional para mostrar/ocultar sección de viáticos según tipo de solicitud
4. Desarrollar módulo de cálculo automático para rendiciones de anticipos (complemento/devolución)
5. Integrar con sistema de gestión de documentos para adjuntos (constancia bancaria, comprobantes)
6. Considerar unificar ambos formularios en uno solo con selección de tipo (Anticipo vs Reintegro)
