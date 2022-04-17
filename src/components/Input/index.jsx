import { Container, InputContainer } from "./styles";

export const Input = ({
  label,
  icon: Icon,
  register,
  name,
  error,
  ...rest
}) => {
  //EXEMPLO: falsy = "" (string vazia) = !! = false.
  //Então se houver valor diferente de null/vazio fica truthy = true!
  return (
    <>
      <Container>
        <div>
          {label}
          {!!error && <span> - {error}</span>}
        </div>

        <InputContainer isErrored={!!error}>
          {Icon && <Icon size={20} />}
          <input {...register(name)} {...rest} />
        </InputContainer>
      </Container>
    </>
  );
};
