import { Box } from "@/components/ui/Box";
import { Typography } from "@/components/ui/Typography";

interface AuthFormErrorProps {
  message: string;
}

export function AuthFormError({ message }: AuthFormErrorProps) {
  if (!message) return null;
  return (
    <Box padding="sm" className="bg-destructive/10 border border-destructive/20 rounded-lg">
      <Typography variant="small" className="text-destructive">
        {message}
      </Typography>
    </Box>
  );
}
