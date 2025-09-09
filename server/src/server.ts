import express from "express";
import cors from "cors";
import { config } from "./config/env";
import plateRoutes from "./routes/plate.routes";
import deviceRoutes from "./routes/device.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", plateRoutes);
app.use("/api/device", deviceRoutes);

app.listen(config.port, () => {
	console.log(`🚀 Server running on http://localhost:${config.port}`);
});
