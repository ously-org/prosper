import { Button } from "@/components/ui/button";
import { Box } from "@/components/ui/Box";
import { Mail } from "lucide-react";

interface AuthFormAlternativeProps {
  label: string;
  onClick?: () => void;
}

export function AuthFormAlternative({
  label,
  onClick,
}: AuthFormAlternativeProps) {
  return (
    <Box className="mt-6">
      <Button
        variant="outline"
        className="w-full h-12 bg-background border-border/60 hover:bg-accent"
        type="button"
        onClick={onClick}
      >
        <Mail className="mr-2 size-5" />
        {label}
      </Button>
    </Box>
  );
}
