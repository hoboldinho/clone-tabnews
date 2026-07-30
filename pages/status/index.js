import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAt = "Carregando...";
  let databaseVersion = "Carregando...";
  let databaseMaxConnections = "Carregando...";
  let databaseOpendeConnectios = "Carregando...";

  if (!isLoading && data) {
    updatedAt = new Date(data.updated_at).toLocaleString("pt-BR");
    databaseVersion = data.dependencies.database.version;
    databaseMaxConnections = data.dependencies.database.max_connections;
    databaseOpendeConnectios = data.dependencies.database.opened_connections;
  }

  return (
    <>
      <div>Última atualização: {updatedAt}</div>
      <div>
        -- Banco de dados:
        <div>---- Versão: {databaseVersion}</div>
        <div>---- Máximo de conexões: {databaseMaxConnections}</div>
        <div>---- Conexões abertas: {databaseOpendeConnectios}</div>
      </div>
    </>
  );
}

export default function StatusPage() {
  return (
    <>
      <h1>StatusPage</h1>
      <UpdatedAt />
    </>
  );
}
