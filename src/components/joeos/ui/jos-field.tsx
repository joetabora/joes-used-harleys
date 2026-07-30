import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export function JosField({
  label,
  htmlFor,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`jos-stack-dense ${className}`.trim()}>
      <label htmlFor={htmlFor} className="jos-label">
        {label}
      </label>
      {children}
    </div>
  );
}

export function JosInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`jos-field ${props.className ?? ""}`.trim()} />;
}

export function JosTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`jos-field ${props.className ?? ""}`.trim()} />;
}

export function JosSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`jos-field ${props.className ?? ""}`.trim()} />;
}

export function JosCheckbox({
  label,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; id: string }) {
  return (
    <div className="flex items-center gap-3">
      <input id={id} type="checkbox" className="jos-check" {...props} />
      <label htmlFor={id} className="jos-label">
        {label}
      </label>
    </div>
  );
}
