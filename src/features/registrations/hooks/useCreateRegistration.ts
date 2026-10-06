import { useMutation } from '@tanstack/react-query';
import { registrationService } from '../services/registration.service';

export function useCreateRegistration() {
  return useMutation({
    mutationFn: registrationService.create,
  });
}
