// //api/app.js
// import dotenv from 'dotenv';
// import 'express-async-errors';
// import EventEmitter from 'events';
// import express from 'express';
// import http from 'http';
// import cors from 'cors';
// import { Server as socketIo } from 'socket.io'; 
// import connectDB from '../config/connect.js';
// import notFoundMiddleware from '../middleware/not-found.js';
// import errorHandlerMiddleware from '../middleware/error-handler.js';
// import authMiddleware from '../middleware/authentication.js';
// //-newly added
// import adminRouter from "../routes/admin.js";
// import complaintRouter from "../routes/complaint.js";
// import promoCodeRouter from "../routes/promoCode.js";
// import paymentRouter from "../routes/payment.js";

// // Routers
// import authRouter from '../routes/auth.js';
// import rideRouter from '../routes/ride.js';

// // Import socket handler
// import handleSocketConnection from '../controllers/sockets.js';

// dotenv.config();

// EventEmitter.defaultMaxListeners = 20;

// const app = express();
// app.use(express.json());
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// const server = http.createServer(app);

// const io = new socketIo(server, { cors: { origin: "*" } });

// // Attach the WebSocket instance to the request object
// app.use((req, res, next) => {
//   req.io = io;
//   return next();
// });

// // Initialize the WebSocket handling logic
// handleSocketConnection(io);

// // Routes
// app.use("/auth", authRouter);
// app.use("/ride", authMiddleware, rideRouter);

// //newly added
// app.use("/admin", adminRouter);
// app.use("/complaint", complaintRouter);
// app.use("/promo", promoCodeRouter);
// app.use("/payment", paymentRouter);

// // Middleware
// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI);
//     server.listen(process.env.PORT || 3000, "0.0.0.0", () =>
//       console.log(
//         `HTTP server is running on port http://localhost:${process.env.PORT || 3000}`
//       )
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// start();

// // import dotenv from 'dotenv';
// // import 'express-async-errors';
// // import EventEmitter from 'events';
// // import express from 'express';
// // import http from 'http';
// // import { Server as socketIo } from 'socket.io'; 
// // import connectDB from '../config/connect.js';
// // import notFoundMiddleware from '../middleware/not-found.js';
// // import errorHandlerMiddleware from '../middleware/error-handler.js';
// // import authMiddleware from '../middleware/authentication.js';
// // import adminAuthMiddleware from '../middleware/admin-auth.js';

// // // Routers
// // import authRouter from '../routes/auth.js';
// // import rideRouter from '../routes/ride.js';
// // import adminRouter from "../routes/admin.js";
// // import complaintRouter from "../routes/complaint.js";
// // import promoCodeRouter from "../routes/promoCode.js";
// // import paymentRouter from "../routes/payment.js";

// // // Import socket handler
// // import handleSocketConnection from '../controllers/sockets.js';

// // dotenv.config();

// // EventEmitter.defaultMaxListeners = 20;

// // const app = express();
// // app.use(express.json());
// // // app.use(cors());

// // const server = http.createServer(app);

// // const io = new socketIo(server, { cors: { origin: "*" } });

// // // Attach the WebSocket instance to the request object
// // app.use((req, res, next) => {
// //   req.io = io;
// //   return next();
// // });

// // // Initialize the WebSocket handling logic
// // handleSocketConnection(io);

// // // Routes
// // app.use("/auth", authRouter);
// // app.use("/ride", authMiddleware, rideRouter);

// // // Admin routes with admin authentication
// // app.use("/admin", adminRouter);

// // // Routes that might need admin or user authentication based on your requirements
// // app.use("/complaint", complaintRouter);
// // app.use("/promo", promoCodeRouter);
// // app.use("/payment", paymentRouter);

// // // Middleware
// // app.use(notFoundMiddleware);
// // app.use(errorHandlerMiddleware);

// // const start = async () => {
// //   try {
// //     await connectDB(process.env.MONGO_URI);
// //     server.listen(process.env.PORT || 3000, "0.0.0.0", () =>
// //       console.log(
// //         `HTTP server is running on port http://localhost:${process.env.PORT || 3000}`
// //       )
// //     );
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// // start();

//app.js
import dotenv from 'dotenv';
import 'express-async-errors';
import EventEmitter from 'events';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server as socketIo } from 'socket.io'; 
import connectDB from '../config/connect.js';
import notFoundMiddleware from '../middleware/not-found.js';
import errorHandlerMiddleware from '../middleware/error-handler.js';
import auth, { restrictTo } from '../middleware/authentication.js';

// Routers
import authRouter from '../routes/auth.js';
import adminRouter from '../routes/admin.js';
import rideRouter from '../routes/ride.js';
import complaintRouter from '../routes/complaint.js';
import promoCodeRouter from '../routes/promoCode.js';
import paymentRouter from '../routes/payment.js';

// Import socket handler
import handleSocketConnection from '../controllers/sockets.js';

dotenv.config();

EventEmitter.defaultMaxListeners = 20;

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const server = http.createServer(app);

const io = new socketIo(server, { cors: { origin: "*" } });

// Attach the WebSocket instance to the request object
app.use((req, res, next) => {
  req.io = io;
  return next();
});

// Initialize the WebSocket handling logic
handleSocketConnection(io);

// Routes
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
// app.use("/ride", auth, restrictTo('customer', 'rider'), rideRouter);
app.use("/ride", rideRouter);
app.use("/complaint", complaintRouter);
app.use("/promo", promoCodeRouter);
app.use("/payment", paymentRouter);

// Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(process.env.PORT || 3000, "0.0.0.0", () =>
      console.log(
        `HTTP server is running on port http://localhost:${process.env.PORT || 3000}`
      )
    );
  } catch (error) {
    console.log(error);
  }
};

start();