import dotenv from "dotenv/config";

import app from "./src/app.js";
import { Connecttodb } from "./src/config/database.js";

const PORT = process.env.PORT || 3000;

Connecttodb();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
