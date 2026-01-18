import app from "./app";
import { checkUpi } from "./routes/checkUpi";
import { analyzeCall } from "./routes/analyzeCall";
import "dotenv/config";


app.post("/check-upi", checkUpi);
app.post("/analyze-call", analyzeCall);

app.listen(5000, () => {
  console.log("Suraksha backend running on port 5000");
});
