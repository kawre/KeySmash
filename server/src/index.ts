import { createConnection } from "typeorm";

const main = async () => {
  await createConnection();
};

main().catch((err) => console.log(err));
