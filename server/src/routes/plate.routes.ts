import { Router } from "express";
import {
	recognizePlate,
	isPlateRegistered,
	getVehicleByPlate,
	createDeviceEvent,
} from "../services/plate.service";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

router.post("/recognize", upload.single("image"), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ error: "No image uploaded" });
		}

		const result = await recognizePlate(req.file.path);

		// get the best plate candidate
		const plate = result.results?.[0]?.plate || null;

		// check database registration
		let registered = false;
		let vehicle_id: string | null = null;
		let device_event_id: string | null = null;

		if (plate) {
			registered = await isPlateRegistered(plate);
			if (registered) {
				const vehicleRow = await getVehicleByPlate(plate);
				vehicle_id = vehicleRow?.id ?? null;
			}

			const payload = {
				type: "entry",
				event: "entry", // <- so Next.js stats API will count it
				plate,
				recognized_at: new Date().toISOString(),
			};

			const created = await createDeviceEvent({
				device_id: req.body?.device_id ?? null,
				payload,
				vehicle_id,
			});
			device_event_id = created.id;
		}

		res.json({
			success: true,
			plate,
			registered,
			vehicle_id,
			device_event_id,
			raw: result,
		});
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
});

export default router;
