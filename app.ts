import express, { Request, Response, Application, NextFunction } from 'express';

const app: Application = express();

//setup middleware
app.use(express.json());

// index route
app.get('/package', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Welcome to Package Management System'});
});

// handle 404 routes 
app.all('*', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({message: `Resource ${req.originalUrl} does not exist`})
});

export default app;