import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary: "jos-btn jos-btn-primary",
  ghost: "jos-btn jos-btn-ghost",
  danger: "jos-btn jos-btn-danger",
} as const;

export function JosButton({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
}) {
  return (
    <button
      type={props.type ?? "button"}
      className={`${variants[variant]} ${className}`.trim()}
      {...props}
    />
  );
}
