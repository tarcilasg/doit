import { useHistory, Redirect } from "react-router-dom";
import { Container, Content } from "./styles";
import { Button } from "../../components/Button";

export const Home = ({ authenticated }) => {
  const history = useHistory();

  const handleNav = (path) => {
    return history.push(path);
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Container>
        <Content>
          <h1>
            do<span>.</span>it
          </h1>
          <span>organize-se de forma fácil e efetiva</span>
          <div>
            <Button onClick={() => handleNav("/signup")} whiteSchema>
              cadastre-se
            </Button>
            <Button onClick={() => handleNav("/login")}>login</Button>
          </div>
        </Content>
      </Container>
    </>
  );
};
