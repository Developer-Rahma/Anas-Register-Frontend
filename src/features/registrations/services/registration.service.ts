import { apiClient } from '../../../infrastructure/http/axios';
import type { CreateRegistrationPayload, CreateRegistrationResponse } from '../types/registration.types';

export const registrationService = {
  async create(payload: CreateRegistrationPayload): Promise<CreateRegistrationResponse> {
    const { data } = await apiClient.post<CreateRegistrationResponse>('/api/v1/registrations', payload);
    return data;
  },
};
