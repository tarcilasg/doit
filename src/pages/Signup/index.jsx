import {
  Container,
  Background,
  Content,
  AnimationContainer,
} from "./styles.js";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { useHistory, Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import api from "../../services/api";

export const Signup = ({ authenticated }) => {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório!"),
    email: yup.string().email("E-mail inválido").required("Campo obrigatório!"),
    password: yup
      .string()
      .min(8, "Mínimo de 8 caracteres")
      .required("Campo obrigatório!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "As senhas estão diferentes")
      .required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const history = useHistory();

  const onSubmitFunction = ({ name, email, password }) => {
    const user = { name, email, password };
    console.log(user);

    api
      .post("user/register", user)
      .then((_) => {
        toast.success("Conta criada com sucesso!"); //underline pq ñ vai exibir dados
        return history.push("/login");
      })
      .catch((err) => toast.error("Erro ao criar a conta! Revise seus dados"));
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Container>
        <Background />
        <Content>
          <AnimationContainer>
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <Input
                register={register}
                icon={FiUser}
                label="nome"
                placeholder="nome"
                name="name"
                error={errors.name?.message}
              />
              <Input
                register={register}
                icon={FiMail}
                label="e-mail"
                placeholder="seu melhor e-mail"
                name="email"
                error={errors.email?.message}
              />
              <Input
                register={register}
                icon={FiLock}
                type="password"
                label="senha"
                placeholder="senha bem segura"
                name="password"
                error={errors.password?.message}
              />
              <Input
                register={register}
                icon={FiLock}
                type="password"
                label="confirme senha"
                placeholder="confirmação da senha"
                name="confirmPassword"
                error={errors.confirmPassword?.message}
              />
              <Button type="submit">enviar</Button>
              <p>
                Já tem uma conta? Faça seu <Link to="/login">login</Link>
              </p>
            </form>
          </AnimationContainer>
        </Content>
      </Container>
    </>
  );
};
