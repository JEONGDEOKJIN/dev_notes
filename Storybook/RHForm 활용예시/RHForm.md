



### RHForm.tsx 파일 
```jsx
import { FormEventHandler, PropsWithChildren, useCallback } from "react";

import { DevTool } from "@hookform/devtools";

import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldValues, Mode } from "react-hook-form/dist/types";
import type { UseFormProps } from "react-hook-form/dist/types/form";

import { ZodType, ZodTypeDef } from "zod";

type RHFormProps<FormType extends FieldValues> = Omit<UseFormProps<FormType>, "defaultValues"> &
  Required<Pick<UseFormProps<FormType>, "defaultValues">>;

type IRHFormProps<FormType extends FieldValues> = {
  schema: ZodType<FormType, ZodTypeDef, FormType>;
  onValid?: SubmitHandler<FormType>;
  onInvalid?: SubmitErrorHandler<FormType>;
  onReset?: FormEventHandler<HTMLFormElement>;
} & RHFormProps<FormType>;

export type IRHForm<FormType extends FieldValues> = Pick<
  IRHFormProps<FormType>,
  "schema" | "onValid" | "onInvalid" | "onReset" | "defaultValues"
> & {
  method?: string;
  values?: FormType;
  mode?: Mode;
};

export default function RHForm<FormType extends FieldValues>({
  children,
  onValid = () => {},
  onReset,
  onInvalid,
  schema,
  defaultValues,
  method,
  mode = "all",
}: PropsWithChildren<IRHForm<FormType>>) {
  const methods = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues,
    mode,
    shouldUnregister: true,
  });

  const handleReset = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      methods.reset();

      if (onReset) {
        onReset(e);
      }
    },
    [methods, onReset],
  );

  return (
    <FormProvider<FormType> {...methods}>
      <form method={method} onReset={handleReset} onSubmit={methods.handleSubmit(onValid, onInvalid)}>
        {children}
      </form>
      <DevTool control={methods.control} />
    </FormProvider>
  );
}

```