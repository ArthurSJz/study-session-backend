import express from "express";
import cors from "cors";
import subjectRoutes from "./routes/subject.routes";
import sessionRoutes from "./routes/session.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/subjects", subjectRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Study Session API is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});