import { config } from "dotenv";
import { Task } from "./schema";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

config({ path: ".env.local" });

if (!("TURSO_DATABASE_URL" in process.env)) {
	throw new Error("TURSO_CONNECTION_URL not found on .env");
}

const client = createClient({
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	url: process.env.TURSO_DATABASE_URL!,
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	authToken: process.env.TURSO_AUTH_TOKEN!,
});

const db = drizzle(client);

const taskData = [
  {
    "id": 1,
    "name": "Maintenance Perangkat",
    "description": "Pemeliharaan dan Maintenace perangkat komputer (Komputer/Laptop/Printer/Ip Phone)",
    "type": "main",
    "createdAt": "2025-04-24T00:00:00.000Z",
    "updatedAt": "2025-04-24T00:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Update Data SIMRS",
    "description": "Update dan Perbaikan data SIMRS",
    "type": "main",
    "createdAt": "2025-04-24T00:00:00.000Z",
    "updatedAt": "2025-04-24T00:00:00.000Z"
  },
  {
    "id": 3,
    "name": "Jaringan SIMRS",
    "description": "Monitoring, Pemeliharaan, Maintenance Jaringan (Local) SIMRS dan Internet",
    "type": "main",
    "createdAt": "2025-04-24T00:00:00.000Z",
    "updatedAt": "2025-04-24T00:00:00.000Z"
  },
  {
    "id": 4,
    "name": "Server SIMRS",
    "description": "Pemeliharaan dan Maintenace pada Server SIMRS",
    "type": "main",
    "createdAt": "2025-04-24T00:00:00.000Z",
    "updatedAt": "2025-04-24T00:00:00.000Z"
  },
  {
    "id": 5,
    "name": "Service Online",
    "description": "Update dan Maintenace Service Antrian Online, Ketersedian KTT, Jadwal Operasi dan Satusehat",
    "type": "main",
    "createdAt": "2025-04-24T00:00:00.000Z",
    "updatedAt": "2025-04-24T00:00:00.000Z"
  },
  {
    "id": 6,
    "name": "Backup Database",
    "description": "Backup Database SIMRS (online dan Offline)",
    "type": "main",
    "createdAt": "2025-04-24T00:00:00.000Z",
    "updatedAt": "2025-04-24T00:00:00.000Z"
  },
  {
    "id": 7,
    "name": "Troubleshot SIMRS",
    "description": "Update Database dan Troubelshot Aplikasi SIMRS Khanza",
    "type": "main",
    "createdAt": "2025-04-24T00:00:00.000Z",
    "updatedAt": "2025-04-24T00:00:00.000Z"
  },
  {
    "id": 8,
    "name": "Pengembangan SIMRS",
    "description": "Pengembangan Aplikasi SIMRS",
    "type": "main",
    "createdAt": "2025-04-24T00:00:00.000Z",
    "updatedAt": "2025-04-24T00:00:00.000Z"
  },
  {
    "id": 9,
    "name": "Mapping Satu Sehat",
    "description": "Mapping dan Kirim Data Satu Sehat",
    "type": "main",
    "createdAt": "2025-04-24T00:00:00.000Z",
    "updatedAt": "2025-04-24T00:00:00.000Z"
  },
  {
    "id": 10,
    "name": "Monitoring I-Care BPJS",
    "description": "Monitoring dan Troubleshot I-Care BPJS dengan SIMRS",
    "type": "main",
    "createdAt": "2025-04-24T00:00:00.000Z",
    "updatedAt": "2025-04-24T00:00:00.000Z"
  },
  {
    "id": 11,
    "name": "Monitoring Antrian Online",
    "description": "Monitoring dan Kirim data backdate Antrian Online",
    "type": "main",
    "createdAt": "2025-04-24T00:00:00.000Z",
    "updatedAt": "2025-04-24T00:00:00.000Z"
  }
]

async function seed() {
	console.log("Seeding database...");

	await db.insert(Task).values(
		taskData.map((task) => ({
			...task,
			createdAt: new Date(task.createdAt),
			updatedAt: new Date(task.updatedAt),
		})),
	);

	console.log("Database seeded successfully!");
	console.log("Seeding completed.");
}

seed()
	.catch((error) => {
		console.error("Error seeding database:", error);
		process.exit(1);
	})
	.finally(() => {
		process.exit(0);
	});
