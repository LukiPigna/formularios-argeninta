// Configuración de Firebase
const firebaseConfig = {
    projectId: "formularios-unit-fondos",
    appId: "1:139373040555:web:6dcc2873498131c2bf38ee",
    storageBucket: "formularios-unit-fondos.firebasestorage.app",
    apiKey: "AIzaSyBMUwmOW1D67shpSu-jeFpssempkH7BWI0",
    authDomain: "formularios-unit-fondos.firebaseapp.com",
    messagingSenderId: "139373040555",
    projectNumber: "139373040555"
};

// Instrucciones para agregar dominios autorizados:
// 1. Ve a Firebase Console: https://console.firebase.google.com/project/formularios-unit-fondos/authentication/providers
// 2. Haz clic en "Google Sign-In" (si no está habilitado, habilítalo primero)
// 3. En "Dominios autorizados", agrega:
//    - localhost
//    - 127.0.0.1
// 4. Haz clic en "Guardar"

console.log('Para que el login funcione, debes agregar los dominios locales en Firebase Console:');
console.log('https://console.firebase.google.com/project/formularios-unit-fondos/authentication/providers');
console.log('');
console.log('Dominios a agregar:');
console.log('- localhost');
console.log('- 127.0.0.1');
console.log('');
console.log('O cualquier dominio donde estés corriendo la aplicación.');

export { firebaseConfig };