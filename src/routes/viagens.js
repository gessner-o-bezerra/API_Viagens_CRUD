const express = require('express');
const router = express.Router();

const travels = []

const generateId = () => {
  return travels.length + 1;
};

// signup
router.post('/', (req, res) => {
  const { name, price, dealsNumber } = req.body;

  // Validações
  if (!name || !price || !dealsNumber) {
    return res.status(400).send('Por favor, forneça destino, data e preço.');
  }

  // Cria nova viagem
  const newTravel = {
    id: generateId(),
    name,
    price,
    dealsNumber,
  };

  travels.push(newTravel);

  res.status(201).send(`${name} criado com sucesso ! Seu identificador é : ${newTravel.id} , seu preço é : ${price} e temos ${dealsNumber} em promoção.`);
});

// Rota para listar todas as viagens
router.get('/', (req, res) => {
  if (travels.length === 0) {
    return res.status(200).send("Não há viagens disponíveis no momento");
  }
  let response = "As viagens são:\n";
  travels.forEach((t) => {
    response += `${t.name}\nR$ ${t.price}\nTemos em promoção: ${t.dealsNumber}\n\n`;
  });
  console.log(travels);
  res.status(200).send(response.trim());
});

// Rota para buscar viagem por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const travel = travels.find(t => t.id === parseInt(id));

  if (!travel) {
    return res.status(404).send('Viagem não encontrada.');
  }

  res.status(200).json(travel);
});

// Rota para atualizar viagem
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, dealsNumber } = req.body;

  // Encontra a viagem
  let travelFound = false;
  for (let t of travels) {
    if (t.id === parseInt(id)) {
      travelFound = true;
      if (name) t.name = name;
      if (price) t.price = price;
      if (dealsNumber) t.dealsNumber = dealsNumber;
      return res.status(200).send(`${t.name} atualizada com sucesso! Seu preço é: ${t.price} e temos ${t.dealsNumber} em promoção.`);
    }
  }

  if (!travelFound) {
    res.status(404).send('Por favor, informe um id válido da viagem');
  }
  console.log(t);
});

// Rota para deletar viagem por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const travelIndex = travels.findIndex(t => t.id === parseInt(id));

  if (travelIndex === -1) {
    return res.status(404).send('Viagem não encontrada.');
  }

  travels.splice(travelIndex, 1);
  res.status(200).send('Viagem deletada com sucesso.');
});

// Rota para deletar todas as viagens
router.delete('/', (req, res) => {
  travels.length = 0;
  res.status(200).send('Todas as viagens foram deletadas.');
});

module.exports = router;
