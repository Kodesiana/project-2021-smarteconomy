import { Input, TextInputProps } from "@mantine/core"
import { Field } from "react-final-form"

type InputWrapperProps = {
  name: string;
  required?: boolean;
  label?: string;
  Component: any;
  placeholder?: string;
  desc?: string;
  mt?: string;
}

const composeValidators = (...validators: any[]) => (value: any) =>
  validators.reduce((error, validator) => error || validator(value), undefined)

const validateRequired = (message: string) => 
  (value: any) => 
  (value ? undefined : `Harap Mengisi ${message}`)

const ComponentRender = ({ Component, input }: { input: any, Component: any}) => {
  if (typeof Component === 'function') {
    return Component(input)
  }
  return <Component {...input} />
}

const InputWrapper = ({
  name,
  required,
  label,
  Component,
  desc,
  placeholder,
  ...rest
}: InputWrapperProps) => {
  return (
    <Field
      name={name}
      validate={required && label ? composeValidators(validateRequired(label)) : undefined}
    >
      {({ input, meta }) => {
        return (
          <Input.Wrapper withAsterisk={required} mb="lg" {...rest}>
            {label && <Input.Label required={required}>
              {label}
            </Input.Label>}
            {desc && <Input.Description>{desc}</Input.Description>}
            <ComponentRender Component={Component} input={{ ...input, placeholder }} />
            {meta.error && meta.touched && <Input.Error>{meta.error}</Input.Error>}
          </Input.Wrapper>
        )
      }}
    </Field>
  )
}

export default InputWrapper