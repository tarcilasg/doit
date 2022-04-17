import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Container, InputContainer, TasksContainer } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { FiEdit2 } from "react-icons/fi";

import api from "../../services/api";

export const Dashboard = ({ authenticated }) => {
  const dateOnTop = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const [tasks, setTasks] = useState([]);
  const [token] = useState(
    JSON.parse(localStorage.getItem("@Doit:token")) || ""
  );
  const { register, handleSubmit } = useForm();

  const loadTasks = () => {
    api
      .get("task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          completed: false,
        },
      })
      .then((res) => {
        const apiTasks = res.data.data.map((task) => ({
          ...task,
          createdAt: new Date(task.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        }));
        setTasks(apiTasks);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const onSubmit = ({ task }) => {
    if (!task) {
      return toast.error("Comple o campo para enviar a tarefa");
    }

    api
      .post(
        "task",
        {
          description: task,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => loadTasks());
  };

  const handleCompleted = (id) => {
    const newTasks = tasks.filter((task) => task._id !== id);

    api
      .put(
        `task/${id}`,
        { completed: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setTasks(newTasks));
  };

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <InputContainer onSubmit={handleSubmit(onSubmit)}>
        <time>{dateOnTop}</time>
        <section>
          <Input
            icon={FiEdit2}
            placeholder="nova tarefa"
            register={register}
            name="task"
            error=""
          />
          <Button type="submit">adicionar</Button>
        </section>
      </InputContainer>
      <TasksContainer>
        {tasks.map((task) => (
          <Card
            key={task._id}
            title={task.description}
            date={task.createdAt}
            onClick={() => handleCompleted(task._id)}
          />
        ))}
      </TasksContainer>
    </Container>
  );
};
