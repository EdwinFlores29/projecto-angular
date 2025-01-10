import dotenv from 'dotenv';
dotenv.config();
import Hapi from '@hapi/hapi';
import inert from '@hapi/inert';
import routes from './routes';
import { db } from './database';
import * as admin from 'firebase-admin';
import credentials from '../credentials.json';

// Inicialización de Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

// Función principal para iniciar el servidor
const startServer = async () => {
    try {
        // Crear instancia del servidor Hapi
        const server = Hapi.server({
            port: 8080,
            host: '0.0.0.0',
        });

        await server.register(inert);

        // Registrar rutas
        routes.forEach(route => server.route(route));

        // Conexión a la base de datos
        await db.connect();

        // Iniciar el servidor
        await server.start();
        console.log(`Server is listening on ${server.info.uri}`);

        // Manejo de señales para detener el servidor
        process.on('SIGINT', async () => {
            console.log('Stopping server...');
            await server.stop({ timeout: 10000 });
            await db.end();
            console.log('Server stopped');
            process.exit(0);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

// Llamada para iniciar el servidor
startServer();
