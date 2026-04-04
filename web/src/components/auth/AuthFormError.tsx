interface AuthFormErrorProps {
  message: string;
}

export function AuthFormError({ message }: AuthFormErrorProps) {
  if (!message) return null;
  return (
    <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
      {message}
    </div>
  );
}
