import email from "infra/email.js";
import database from "infra/database.js";
import webserver from "infra/webserver.js";
import { NotFoundError } from "infra/errors.js";

const EXPIRATION_IN_MILLISECONDS = 60 * 15 * 1000; // 15 minutes

async function findOneByUserId(userId) {
  const userFound = await runSelectQuery(userId);

  return userFound;

  async function runSelectQuery(userId) {
    const results = await database.query({
      text: `
        SELECT
          *
        FROM
          user_activation_tokens
        WHERE
          user_id = $1
        LIMIT
          1
        ;`,
      values: [userId],
    });

    if (results.rowCount === 0) {
      throw new NotFoundError({
        message: "O userId informado não foi encontrado no sistema.",
        action: "Verifique se o userId está digitado corretamente.",
      });
    }

    return results.rows[0];
  }
}

async function create(userId) {
  const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS);

  const newToken = await runInsertQuery(userId, expiresAt);
  return newToken;

  async function runInsertQuery(userId, expiresAt) {
    const results = await database.query({
      text: `
        INSERT INTO
          user_activation_tokens (user_id, expires_at)
        VALUES
          ($1, $2)
        RETURNING
          *
        ;`,
      values: [userId, expiresAt],
    });
    return results.rows[0];
  }
}

async function sendActivationMail(user, activationToken) {
  await email.send({
    from: "FinTab <contato@fintab.com.br>",
    to: user.email,
    subject: "Ativação de Conta",
    text: `${user.username} acesse o link para ativar sua conta no FinTab.

${webserver.origin}/cadastro/ativar/${activationToken.id}

Atensiosamente,
Equipe Fintab`,
  });
}

const activation = {
  findOneByUserId,
  create,
  sendActivationMail,
};

export default activation;
