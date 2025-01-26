import config from '@config/index';
import { CreateUserDTO } from '@modules/user/user.interface';
import axios from 'axios';

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
      headers: { Authorization: `Bearer ${this.secretKey}` },
    });
  }

  /**
   *
   * @param endpoint
   * @returns Promise<Partial<CreateUserDTO>>
   */
  static async fetchFromBackend2(
    endpoint: string
  ): Promise<Partial<CreateUserDTO>> {
    const response = await axios.get(`${config.backend_2_url}${endpoint}`, {
      headers: { Authorization: `Bearer ${this.secretKey}` },
    });
    return response.data;
  }
}
