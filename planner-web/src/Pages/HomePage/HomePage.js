import React from 'react';
import { Navbar, Nav, Container, Row, Col, Card, Button } from 'react-bootstrap';

const HomePage = () => {
  return (
    <>
      {/* Barra de Navegação */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">We Love Planner</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#home">Início</Nav.Link>
              <Nav.Link href="#products">Produtos</Nav.Link>
              <Nav.Link href="#about">Sobre</Nav.Link>
              <Nav.Link href="#contact">Contato</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Banner Principal */}
      <div className="bg-light py-5 text-center">
        <Container>
          <h1>Organize sua vida com estilo</h1>
          <p>Planners personalizados para todas as suas necessidades.</p>
          <Button variant="primary" href="#products">Ver Produtos</Button>
        </Container>
      </div>

      {/* Seção de Produtos Destacados */}
      <Container className="py-5" id="products">
        <h2 className="text-center mb-4">Produtos Destacados</h2>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/300x200" />
              <Card.Body>
                <Card.Title>Planner 2025 Personalizado</Card.Title>
                <Card.Text>
                  Transforme sua organização com nossos planners personalizados.
                </Card.Text>
                <Button variant="primary" href="#buy">Comprar Agora</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/300x200" />
              <Card.Body>
                <Card.Title>Agenda 2025</Card.Title>
                <Card.Text>
                  Mantenha-se no controle com nossas agendas elegantes.
                </Card.Text>
                <Button variant="primary" href="#buy">Comprar Agora</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/300x200" />
              <Card.Body>
                <Card.Title>Meu Planner 2025</Card.Title>
                <Card.Text>
                  Personalize seu planejamento diário com estilo.
                </Card.Text>
                <Button variant="primary" href="#buy">Comprar Agora</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
