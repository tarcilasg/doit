import { Button } from "../Button";
import { Container } from "./styles";
import { FiClipboard, FiCalendar } from "react-icons/fi";

export const Card = ({ title, date, onClick }) => {
  return (
    <>
      <Container>
        <span>
          <FiClipboard />
          {title}
        </span>
        <hr />
        <time>
          <FiCalendar />
          {date}
        </time>
        <Button onClick={onClick}>concluir</Button>
      </Container>
    </>
  );
};
