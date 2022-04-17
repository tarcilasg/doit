import {
  Container,
  Background,
  Content,
  AnimationContainer,
} from "./styles.js";
import { FiMail, FiLock } from "react-icons/fi";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { useHistory, Redirect, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import api from "../../services/api";

export const Login = ({ authenticated, setAuthenticated }) => {
  const schema = yup.object().shape({
    email: yup.string().email("E-mail inválido").required("Campo obrigatório!"),
    password: yup
      .string()
      .min(8, "Mínimo de 8 caracteres")
      .required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const history = useHistory();

  const onSubmitFunction = (data) => {
    const user = data;
    console.log(user);

    api
      .post("user/login", data)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("@Doit:token", JSON.stringify(token));

        setAuthenticated(true);
        return history.push("/dashboard");
      })
      .catch((err) => toast.error("E-mail e/ou senha inválidos"));
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Container>
        <Content>
          <AnimationContainer>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
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
              <Button type="submit">enviar</Button>
              <p>
                Ainda não tem conta? Faça seu
                <Link to="/signup"> cadastro</Link>
              </p>
            </form>
          </AnimationContainer>
        </Content>
        <Background />
      </Container>
    </>
  );
};
