import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Form, Button } from "react-bootstrap";

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://jubilant-system-x5v7w76x547rcp9wg-5000.app.github.dev/login", {
        username,
        password,
      });

      if (response.status === 200) {
        onLoginSuccess();
        navigate("/home");
      }
    } catch (error) {
      setError("Login falhou. Verifique suas credenciais.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card style={{ width: "350px", padding: "20px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Fazer login</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formUsername">
              <Form.Control
                type="text"
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-3"
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>

          {/* Link para a página de registro */}
          <div className="text-center mt-3">
            <Button variant="link" onClick={() => navigate("/register")}>
              Ainda não tem uma conta? Cadastre-se
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
