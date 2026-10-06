import axios from 'axios';

type ValidationDetails = {
  formErrors?: string[];
  fieldErrors?: Record<string, string[] | undefined>;
};

type ApiErrorBody = {
  error?: string;
  details?: ValidationDetails;
};

export function getApiErrorMessage(error: unknown): string {
  if (!axios.isAxiosError<ApiErrorBody>(error)) {
    return 'تعذر إرسال التسجيل الآن. يرجى المحاولة مرة أخرى.';
  }

  const body = error.response?.data;
  const validationMessage = body?.details?.formErrors?.[0]
    ?? Object.values(body?.details?.fieldErrors ?? {}).flat().find(Boolean);

  if (validationMessage) return validationMessage;
  if (body?.error && body.error !== 'Validation failed') return body.error;
  if (error.code === 'ECONNABORTED') return 'انتهت مهلة الاتصال بالخادم. يرجى المحاولة مرة أخرى.';
  if (!error.response) return 'تعذر الاتصال بالخادم. يرجى التحقق من اتصالك ثم المحاولة.';

  return 'تعذر إرسال التسجيل الآن. يرجى المحاولة مرة أخرى.';
}
