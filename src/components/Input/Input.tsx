import { forwardRef, HTMLProps } from "react";
interface InputProps extends Omit<HTMLProps<HTMLInputElement>, "alt"> {
  labe?: string;
  id: string;
  type: "text" | "email" | "password";
  error?: { message: string };
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({label, error, id,type, ...rest }, ref) => {
  return (
    <>
    {label ? (
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
    ) : null}
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={type === "password" ? "current-password" : "email"}
        required
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
        {...rest}
        ref={ref}
      />
      {error ? (
          <span className="mt-10 text-center font-light text-xs text-opacity-35 text-amber-600">{error.message}</span>
        ) : null}
      </>
  )
});