// Simplified storage for navigation testing
export interface SimpleStorage {
  getHealth(): Promise<{ status: string; message: string }>;
}

export class SimpleMemStorage implements SimpleStorage {
  async getHealth(): Promise<{ status: string; message: string }> {
    return { status: 'ok', message: 'Simple storage running' };
  }
}

export const simpleStorage = new SimpleMemStorage();