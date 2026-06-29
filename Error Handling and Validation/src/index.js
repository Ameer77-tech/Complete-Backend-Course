import server from "./server.js";
import env from "./config/env.js";

const PORT = env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
