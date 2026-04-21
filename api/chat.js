const clients = {
  "cafe-bliss": {
    name: "Cafe Bliss",
    hours: "9AM - 11PM"
  },

  "burger-hub": {
    name: "Burger Hub",
    hours: "12PM - 2AM"
  }
};

export default function handler(req, res) {
  const { message, clientId } = req.body;

  if (!clientId) {
    return res.status(400).json({
      reply: "clientId is required"
    });
  }

  const client = clients[clientId];

  if (!client) {
    return res.status(404).json({
      reply: "Client not found"
    });
  }

  return res.status(200).json({
    reply: `${client.name} is open ${client.hours}`
  });
}
