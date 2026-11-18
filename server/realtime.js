const clients = new Set();

export function addSseClient(res) {
  clients.add(res);
  res.on('close', () => {
    clients.delete(res);
  });
}

export function broadcastEvent(type, payload = {}) {
  const data = JSON.stringify({
    type,
    ...payload,
    timestamp: new Date().toISOString(),
  });
  for (const client of clients) {
    try {
      client.write(`data: ${data}\n\n`);
    } catch {
      clients.delete(client);
    }
  }
}

export function getConnectedClientsCount() {
  return clients.size;
}
