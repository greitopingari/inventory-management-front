import { FormProvider } from "react-hook-form";

export default function Form({ methods, onSubmit, className, children }) {
  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>{children}</form>
    </FormProvider>
  );
}
