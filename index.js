import app from "./app.js";

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running and PORT is > http://localhost:${PORT}`);
});
