import 'dotenv/config'; // load env variables
import app from './app';
import mongoose from 'mongoose';

try {
    // authenticate db
    // connect db
    const db = await mongoose.connect(
        String(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`)
    );

    if (db) console.log('Connected to Database');
    mongoose.connection.on('error', (err) => {
        console.error(`Error connecting to DB: ${err}`);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection closed');
    });
    // set app port
    const port = Number(process.env.PORT) || 6001;
    // spin off the server
    app.listen(port, () => {
        console.log(
            `🚀  Patient service is ready at: http://localhost:${port}`
        );
    });
} catch (err) {
    process.exit();
}

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

process.on('unhandledRejection', async (error) => {
    await mongoose.connection.close();
    process.exit(1); //server needs to crash and a process manager will restart it
});

process.on('uncaughtException', async (error) => {
    await mongoose.connection.close();
    process.exit(1); //server needs to crash and a process manager will restart it
});