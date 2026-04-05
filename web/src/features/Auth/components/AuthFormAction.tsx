import { Button } from "@/components/ui/button";

interface AuthFormActionProps {
  isLoading: boolean;
  label: string;
  loadingLabel: string;
}

export function AuthFormAction({
  isLoading,
  label,
  loadingLabel,
}: AuthFormActionProps) {
  return (
    <Button
      type="submit"
      className="w-full h-12 text-base font-medium"
      size="lg"
      disabled={isLoading}
    >
      {isLoading ? loadingLabel : label}
    </Button>
  );
}
