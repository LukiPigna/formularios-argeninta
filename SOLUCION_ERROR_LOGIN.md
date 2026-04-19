# Solución para el error de login con Firebase

## Problema
Cuando intentas iniciar sesión con Google, aparece un error. Esto es porque los dominios locales no están autorizados en Firebase.

## Solución: Agregar dominios autorizados en Firebase

### Paso 1: Acceder a Firebase Console
1. Ve a: https://console.firebase.google.com
2. Selecciona el proyecto: "FormulariosGestionFondos"
3. En el menú lateral, ve a "Authentication" → "Sign-in method"

### Paso 2: Habilitar Google Sign-In
1. Busca "Google" en la lista de proveedores
2. Si no está habilitado, haz clic en el icono de Google
3. Activa el interruptor para habilitarlo
4. Haz clic en "Guardar"

### Paso 3: Agregar dominios autorizados
1. En la misma página de "Sign-in method"
2. Ve a la sección "Dominios autorizados" (Authorized domains)
3. Haz clic en "Agregar dominio" (Add domain)
4. Agrega estos dominios uno por uno:
   - `localhost`
   - `127.0.0.1`
   - Tu dirección IP local si corres la app desde otra computadora

5. También puedes agregar otros dominios donde planees desplegar la aplicación

### Paso 4: Probar el login
1. Regresa a tu aplicación local
2. Abre `login.html` en tu navegador
3. Haz clic en "Iniciar sesión con Google"
4. Completa el proceso de autenticación

## Solución alternativa: Modo Demo

Si por alguna razón no puedes configurar los dominios en Firebase, puedes usar el modo demo:

1. En `login.html`, haz clic en "Continuar sin iniciar sesión (Demo)"
2. Esto te permitirá acceder a los formularios sin autenticación
3. **Nota**: Esto es solo para desarrollo y pruebas, no es seguro para producción

## Verificar la configuración

Para verificar que todo esté configurado correctamente:

1. Abre las herramientas de desarrollador del navegador (F12)
2. Ve a la pestaña "Console"
3. Intenta iniciar sesión
4. Si ves errores como "unauthorized domain", significa que los dominios no están configurados

## Errores comunes y soluciones

### Error: "auth/unauthorized-domain"
**Causa**: El dominio donde se está ejecutando la aplicación no está en la lista de dominios autorizados.
**Solución**: Agrega el dominio (ej: localhost) en Firebase Console.

### Error: "auth/popup-blocked"
**Causa**: El navegador está bloqueando las ventanas emergentes.
**Solución**: Habilita las ventanas emergentes para tu sitio o usa la opción de redirección.

### Error: "auth/operation-not-allowed"
**Causa**: Google Sign-In no está habilitado en Firebase Console.
**Solución**: Habilita Google Sign-In en Firebase Console.

### Error: "auth/network-request-failed"
**Causa**: Problemas de conexión a internet o firewall bloqueando las solicitudes.
**Solución**: Verifica tu conexión a internet y que no haya firewall bloqueando las conexiones a Firebase.

## Configuración de producción

Para desplegar en producción, necesitarás:

1. Agregar tu dominio de producción en Firebase Console
2. Considerar usar Firebase Hosting o GitHub Pages
3. Configurar reglas de seguridad adicionales si es necesario
4. Implementar verificación de backend para mayor seguridad

## Enlaces útiles

- Firebase Console: https://console.firebase.google.com/project/formularios-unit-fondos/authentication/providers
- Documentación de Firebase Auth: https://firebase.google.com/docs/auth
- Google Sign-In: https://firebase.google.com/docs/auth/web/google-signin

## Contacto

Si el problema persiste después de configurar los dominios, verifica:

1. Que tu API key de Firebase sea válida
2. que el proyecto esté correctamente configurado
3. Que no haya errores en la consola del navegador
4. Que Firebase Authentication esté habilitado en tu proyecto