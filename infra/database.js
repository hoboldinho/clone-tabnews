import { Client } from "pg";

async function query(queryObject) {
  const clientInformations = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  };
  console.log("clientInformations:", clientInformations);
  const client = new Client(clientInformations);

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error("queryError:", error);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
