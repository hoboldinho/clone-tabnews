function status(request, response) {
  response.status(200).json({ chave: "fera demais, vou por um acento 'ó'" });
}

export default status;
