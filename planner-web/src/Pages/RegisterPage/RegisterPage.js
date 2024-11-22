import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Form, Button } from "react-bootstrap";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("https://jubilant-system-x5v7w76x547rcp9wg-5000.app.github.dev/register", {
        username,
        password,
        email,
      });

      if (response.status === 201) {
        setSuccess("Usuário cadastrado com sucesso!");
        // Redirecionar para a página de login após o cadastro
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setError("Falha no cadastro. Verifique os dados e tente novamente.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card style={{ width: "350px", padding: "20px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Cadastrar-se</Card.Title>
          <Form onSubmit={handleRegister}>
            {/* Campo Nome de Usuário */}
            <Form.Group controlId="formUsername">
              <Form.Control
                type="text"
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-3"
                required
              />
            </Form.Group>

            {/* Campo Email */}
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-3"
                required
              />
            </Form.Group>

            {/* Campo Senha */}
            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-3"
                required
              />
            </Form.Group>

            {/* Mensagens de Erro ou Sucesso */}
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}

            {/* Botão de Cadastro */}
            <Button variant="primary" type="submit" className="w-100">
              Cadastrar
            </Button>
          </Form>

          {/* Link para voltar à página de login */}
          <div className="text-center mt-3">
            <Button variant="link" onClick={() => navigate("/login")}>
              Já tem uma conta? Faça login
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterPage;
