import config from '@config/index';
import axios from 'axios';
import { Document } from 'mongodb';

/**
 * Secure communication channel
 */
export class SecureCommunication {
  private static readonly secretKey = config.secret_key;

  /**
   * Sending data to backend_2
   * @param endpoint
   * @param data
   */
  static async postToBackend2(endpoint: string, data: object): Promise<void> {
    await axios.post(`${config.backend_2_url}${endpoint}`, data, {
      headers: { Authorization: `Bearer ${SecureCommunication.secretKey}` },
    });
  }

  /**
   *
   * @param endpoint
   * @returns Promise<Partial<CreateUserDTO>>
   */
  static async fetchFromBackend2(
    endpoint: string
  ): Promise<Document> {
    const response = await axios.get(`${config.backend_2_url}${endpoint}`, {
      headers: { Authorization: `Bearer ${SecureCommunication.secretKey}` },
    });
    return response.data;
  }
}
