import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PlannerPage = () => {
  const [tasks, setTasks] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });
  const [currentDay, setCurrentDay] = useState("Monday");
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  // Carregar tarefas do Local Storage ao montar o componente
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks)); // Restaura as tarefas
    }
  }, []);

  // Salvar tarefas no Local Storage
  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Adicionar uma nova tarefa
  const handleAddTask = () => {
    if (newTask.trim() === "") return;

    const updatedTasks = {
      ...tasks,
      [currentDay]: [
        ...tasks[currentDay],
        { text: newTask, completed: false }, // Adiciona a tarefa com status "não concluído"
      ],
    };
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks); // Salva no Local Storage
    setNewTask("");
  };

  // Alternar entre "concluído" e "não concluído"
  const handleToggleTask = (day, index) => {
    const updatedTasks = {
      ...tasks,
      [day]: tasks[day].map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      ),
    };
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks); // Salva no Local Storage
  };

  // Remover uma tarefa
  const handleRemoveTask = (day, index) => {
    const updatedTasks = {
      ...tasks,
      [day]: tasks[day].filter((_, i) => i !== index),
    };
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks); // Salva no Local Storage
  };

  const daysOfWeek = Object.keys(tasks);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Organização Diária e Semanal</h2>

      {/* Botão para voltar à página principal */}
      <Button variant="secondary" className="mb-3" onClick={() => navigate("/home")}>
        Voltar à Página Principal
      </Button>

      {/* Seção Diária */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title className="text-center">Planejamento Diário</Card.Title>
          <Form.Group className="mb-3">
            <Form.Label>Dia Atual</Form.Label>
            <Form.Select
              value={currentDay}
              onChange={(e) => setCurrentDay(e.target.value)}
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Adicionar Tarefas</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite uma nova tarefa"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleAddTask}>
            Adicionar Tarefa
          </Button>

          <ListGroup className="mt-3">
            {tasks[currentDay].map((task, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center"
                style={{
                  backgroundColor: task.completed ? "#d4edda" : "white", // Verde claro para tarefas concluídas
                  transition: "background-color 0.3s ease", // Suaviza a transição
                }}
              >
                <Form.Check
                  type="checkbox"
                  label={
                    <span style={{ color: task.completed ? "#155724" : "black" }}>
                      {task.text}
                    </span>
                  }
                  checked={task.completed}
                  onChange={() => handleToggleTask(currentDay, index)}
                />
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveTask(currentDay, index)}
                >
                  Remover
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Seção Semanal */}
      <Row>
        {daysOfWeek.map((day) => (
          <Col md={4} key={day} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{day}</Card.Title>
                <ListGroup>
                  {tasks[day].map((task, index) => (
                    <ListGroup.Item
                      key={index}
                      className="d-flex justify-content-between align-items-center"
                      style={{
                        backgroundColor: task.completed ? "#d4edda" : "white", // Verde claro para tarefas concluídas
                        transition: "background-color 0.3s ease", // Suaviza a transição
                      }}
                    >
                      <Form.Check
                        type="checkbox"
                        label={
                          <span
                            style={{
                              color: task.completed ? "#155724" : "black",
                            }}
                          >
                            {task.text}
                          </span>
                        }
                        checked={task.completed}
                        onChange={() => handleToggleTask(day, index)}
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveTask(day, index)}
                      >
                        Remover
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PlannerPage;
