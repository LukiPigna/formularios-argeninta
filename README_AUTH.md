# Sistema de Autenticación Híbrido - Firebase y Local

## Descripción

Se ha implementado un sistema de autenticación híbrido que ofrece dos opciones para proteger el acceso a los formularios de gestión de fondos:

1. **Login con Google (Firebase)**: Autenticación profesional usando Firebase Authentication
2. **Login Simplificado (Local)**: Sistema simple para desarrollo y pruebas

## Características

- **Sistema Híbrido**: Funciona tanto con Firebase como con localStorage
- **Login con Google**: Autenticación profesional con cuentas de Google
- **Login Simplificado**: Sistema simple para desarrollo rápido
- **Persistencia de sesión**: La sesión se mantiene activa
- **Flexibilidad**: Puedes usar el método que prefiera según el contexto
- **Manejo de errores**: Sistema robusto que maneja diferentes escenarios

## Archivos Disponibles

### Opción 1: Login Firebase Profesional
- **login.html**: Login con Google Sign-In usando Firebase Authentication
- Requiere configuración de dominios en Firebase Console
- Para uso en producción

### Opción 2: Login Simplificado
- **login-simple.html**: Login simple usando localStorage
- No requiere configuración adicional
- Ideal para desarrollo y pruebas

### Archivos de Formularios (Modificados)
- **formularios_wizard.html**: Formulario wizard con verificación de autenticación
- **formularios.html**: Formulario tradicional con verificación de autenticación
- Ambos funcionan con ambos métodos de autenticación

### Archivos de Configuración
- **firebase-config.js**: Configuración de Firebase
- **SOLUCION_ERROR_LOGIN.md**: Instrucciones detalladas para solucionar errores

## Configuración de Firebase

### Proyecto Firebase
- **ID del proyecto**: `formularios-unit-fondos`
- **Nombre del proyecto**: `FormulariosGestionFondos`

### App Web Firebase
- **ID de la app**: `1:139373040555:web:6dcc2873498131c2bf38ee`
- **Configuración SDK**:
```json
{
  "projectId": "formularios-unit-fondos",
  "appId": "1:139373040555:web:6dcc2873498131c2bf38ee",
  "storageBucket": "formularios-unit-fondos.firebasestorage.app",
  "apiKey": "AIzaSyBMUwmOW1D67shpSu-jeFpssempkH7BWI0",
  "authDomain": "formularios-unit-fondos.firebaseapp.com",
  "messagingSenderId": "139373040555",
  "projectNumber": "139373040555"
}
```

## Cómo Funciona

### Sistema Híbrido Inteligente

El sistema verifica automáticamente:

1. **Primero localStorage**: Si hay un usuario guardado en localStorage, usa esa sesión
2. **Luego Firebase**: Si no hay localStorage, intenta autenticación con Firebase
3. **Fallback**: Si ambos fallan, redirige al login apropiado

### Flujo de Autenticación

1. **Usuario accede al sistema**: Verifica autenticación
2. **No autenticado**: Redirige a `login-simple.html` (o `login.html` si prefieres)
3. **Login simple**: Usuario ingresa nombre y email → Guardado en localStorage
4. **Login Firebase**: Usuario completa Google Sign-In → Guardado en localStorage + Firebase
5. **Éxito**: Redirigido a los formularios
6. **Persistencia**: La sesión se mantiene mientras el usuario no cierre sesión
7. **Cerrar sesión**: Limpia localStorage y/o sesión de Firebase

## Uso Rápido

### Opción 1: Login Simplificado (Recomendado para Desarrollo)

1. Abre `login-simple.html` en tu navegador
2. Ingresa tu nombre y email
3. Haz clic en "Iniciar sesión"
4. Serás redirigido automáticamente a los formularios

### Opción 2: Login con Firebase (Para Producción)

1. **Configura los dominios autorizados** (ver abajo)
2. Abre `login.html` en tu navegador
3. Haz clic en "Iniciar sesión con Google"
4. Completa el proceso de autenticación
5. Serás redirigido a los formularios

## Configuración de Dominios Firebase (Opcional)

Si quieres usar el login con Google, necesitas configurar los dominios:

### Paso 1: Acceder a Firebase Console
1. Ve a: https://console.firebase.google.com/project/formularios-unit-fondos/authentication/providers
2. Habilita "Google Sign-In" si no lo está

### Paso 2: Agregar Dominios Autorizados
1. En la página "Sign-in method", busca "Dominios autorizados"
2. Agrega:
   - `localhost`
   - `127.0.0.1`
   - Tu dirección IP local si corres la app desde otra computadora
   - Cualquier dominio de producción

### Paso 3: Probar
1. Abre `login.html`
2. Intenta iniciar sesión con Google

## Ventajas del Sistema Híbrido

### Login Simplificado
- ✅ No requiere configuración adicional
- ✅ Funciona inmediatamente
- ✅ Ideal para desarrollo y pruebas
- ✅ Permite probar el flujo rápidamente
- ❌ Menos seguro que Firebase
- ❌ No ideal para producción

### Login con Firebase
- ✅ Autenticación profesional
- ✅ Seguridad robusta
- ✅ Integración con Google
- ✅ Ideal para producción
- ❌ Requiere configuración inicial
- ❌ Puede tener errores de dominio no autorizado

## Personalización

### Cambiar el Login por Defecto

Por defecto, el sistema redirige a `login-simple.html`. Para usar `login.html`:

En `formularios_wizard.html` y `formularios.html`, busca:
```javascript
window.location.href = 'login-simple.html';
```
Cámbialo a:
```javascript
window.location.href = 'login.html';
```

### Validar Usuarios Específicos

Para agregar restricciones de usuarios:

En `login-simple.html`, modifica la función `simpleLogin()`:
```javascript
const allowedEmails = ['usuario1@ejemplo.com', 'usuario2@ejemplo.com'];

if (!allowedEmails.includes(userEmail)) {
    showError('Email no autorizado');
    return;
}
```

## Solución de Problemas

### Error: "auth/unauthorized-domain"
**Solución**: Configura los dominios en Firebase Console (ver arriba) o usa `login-simple.html`

### Error: "Firebase no está inicializado"
**Solución**: Usa `login-simple.html` o verifica tu conexión a internet

### No puedo iniciar sesión
**Solución**: Usa `login-simple.html` como alternativa inmediata

## Seguridad

### Login Simplificado
- Usa localStorage para persistencia
- No requiere servidor
- Adecuado para desarrollo y pruebas internas
- No se recomienda para producción sin validación adicional

### Login con Firebase
- Usa Firebase Authentication profesional
- Manejo seguro de tokens
- Integración con Google
- Recomendado para producción

## Migración a Producción

Para preparar el sistema para producción:

1. **Configura dominios de producción** en Firebase Console
2. **Elimina el login simplificado** o restringe el acceso
3. **Agrega validaciones de usuarios** específicos
4. **Configura HTTPS** obligatorio
5. **Considera agregar validaciones backend** si es necesario

## Soporte

- **Documentación Firebase**: https://firebase.google.com/docs/auth
- **Solución de errores**: Revisa `SOLUCION_ERROR_LOGIN.md`
- **Firebase Console**: https://console.firebase.google.com

## Notas Importantes

- El sistema funciona completamente en el lado del cliente
- No requiere servidor adicional
- Para producción, usa Firebase Authentication
- Para desarrollo rápido, usa el login simplificado
- Ambos métodos funcionan con los mismos archivos de formularios

## Recomendación

Para desarrollo inmediato: **usa `login-simple.html`**

Para producción: **configura Firebase y usa `login.html`**