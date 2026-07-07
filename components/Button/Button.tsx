import { theme } from "@/styles/theme";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  text,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        w-full
        rounded-2xl
        py-5
        text-lg
        font-semibold
        text-white
        transition-all
        duration-200
        active:scale-95
        disabled:opacity-40
        disabled:cursor-not-allowed
      "
      style={{
        background: theme.colors.primary,
      }}
    >
      {text}
    </button>
  );
}