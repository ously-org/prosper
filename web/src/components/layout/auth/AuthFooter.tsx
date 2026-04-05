export const AuthFooter = () => {
  return (
    <div className="relative z-20 flex items-center justify-between text-xs font-medium text-primary-foreground/40 uppercase tracking-widest">
      <div className="flex gap-6">
        <a
          href="#"
          className="hover:text-primary-foreground transition-colors"
        >
          Privacy
        </a>
        <a
          href="#"
          className="hover:text-primary-foreground transition-colors"
        >
          Terms
        </a>
      </div>
      <span>© 2026 Prosper By Ously</span>
    </div>
  );
};
