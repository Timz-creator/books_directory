import { config } from "dotenv";
import { executeBookCrudOperations } from "./booksCRUD.js";

config();
await executeBookCrudOperations();
