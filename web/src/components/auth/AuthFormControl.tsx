import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface AuthFormControlProps {
  rememberId?: string;
  forgotPath?: string;
}

export function AuthFormControl({
  rememberId = "remember",
  forgotPath = "#",
}: AuthFormControlProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Checkbox id={rememberId} />
        <Label
          htmlFor={rememberId}
          className="text-sm font-normal cursor-pointer"
        >
          Remember me
        </Label>
      </div>
      <a
        href={forgotPath}
        className="text-sm text-primary hover:underline font-medium"
      >
        Forgot password?
      </a>
    </div>
  );
}
