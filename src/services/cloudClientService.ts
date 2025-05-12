// src/services/cloudClientService.ts

// Define an interface for the response expected from the client on the cloud machine
export interface ClientResponse {
  status: 'success' | 'error';
  data?: any;
  message?: string;
}

export class Client {
  id: string;
  address: string;
  lastSeen: Date;
  // Add more properties as needed (e.g., metadata, status)

  constructor(id: string, address: string) {
    this.id = id;
    this.address = address;
    this.lastSeen = new Date();
  }

  updateLastSeen() {
    this.lastSeen = new Date();
  }
}

export class CloudClientService {
  private clientCache: Map<string, Client>;

  constructor() {
    this.clientCache = new Map();
  }

  /**
   * Registers a client when it sends a defined request.
   * If the client already exists, updates its last seen time and address.
   */
  registerClient(id: string, address: string): Client {
    let client = this.clientCache.get(id);
    if (client) {
      client.address = address;
      client.updateLastSeen();
    } else {
      client = new Client(id, address);
      this.clientCache.set(id, client);
    }
    return client;
  }

  /**
   * Sends a command to a registered client by ID.
   */
  async sendMessageToClient(clientId: string, command: string, payload: any): Promise<ClientResponse> {
    const client = this.clientCache.get(clientId);
    if (!client) {
      return { status: 'error', message: `Client with ID ${clientId} not found in cache.` };
    }
    // For now, use the mock sendCommand logic
    return this.sendCommand(client.address, command, payload);
  }

  async sendCommand(machineAddress: string, command: string, payload: any): Promise<ClientResponse> {
    console.log(`Sending command '${command}' to client at ${machineAddress} with payload:`, payload);

    // --- Placeholder for actual client communication logic ---
    // This is where you would implement the code to connect to the client
    // on the cloud machine and send the command.
    // The implementation depends heavily on the protocol your client uses (HTTP, gRPC, etc.)

    // Example using a hypothetical HTTP POST request:
    try {
      // const response = await fetch(`http://${machineAddress}:<client_port>/command`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ command, payload }),
      // });

      // if (!response.ok) {
      //   const errorText = await response.text();
      //   throw new Error(`Client responded with status ${response.status}: ${errorText}`);
      // }

      // const responseData = await response.json();
      // return responseData as ClientResponse; // Assuming the client returns a ClientResponse structure

      // --- Mock response for now ---
       console.log(`Mock: Command '${command}' sent successfully to ${machineAddress}`);
       return { status: 'success', data: { receivedCommand: command, receivedPayload: payload }, message: 'Mock command execution successful' };

    } catch (error: any) {
      console.error(`Error communicating with client at ${machineAddress}:`, error);
      // --- Mock error response for now ---
       return { status: 'error', message: `Mock: Failed to send command to ${machineAddress}: ${error.message}` };
    }
    // --- End of placeholder ---
  }

  // Add other methods for client interaction as needed
}