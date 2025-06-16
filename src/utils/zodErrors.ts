import { ZodFormattedError } from "zod";

export function formatZodErrors<T>(err: ZodFormattedError<T>): Record<string, string> {
  const formatted: Record<string, string> = {};

  for (const key in err) {
    if (key === "_errors") continue;

    const field = err[key as keyof typeof err];
    const messages = (field as any)?._errors;
    
    if (messages && messages.length > 0) {
      formatted[key] = messages[0]; // Only show the first message per field
    }
  }

  return formatted;
}