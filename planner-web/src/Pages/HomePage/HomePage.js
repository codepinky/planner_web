import React, { useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup, Modal, Form } from "react-bootstrap";

const HomePage = () => {
  // Estado para armazenar os itens do Inbox
  const [inboxItems, setInboxItems] = useState([]);

  // Estado para controlar o modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // Tipo de item sendo criado
  const [itemData, setItemData] = useState(""); // Dados inseridos no modal

  // Função para abrir o modal
  const handleOpenModal = (type) => {
    setModalType(type);
    setItemData(""); // Limpa o input
    setShowModal(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Função para adicionar novo item ao Inbox
  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      type: modalType,
      name: itemData || `${modalType} ${inboxItems.filter((item) => item.type === modalType).length + 1}`,
    };
    setInboxItems([...inboxItems, newItem]);
    handleCloseModal(); // Fecha o modal
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Menu Lateral */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRight: "1px solid #dee2e6",
        }}
      >
        <h5 className="mb-4">Início</h5>
        <ListGroup variant="flush">
          <ListGroup.Item action href="#inbox">
            📥 Inbox
          </ListGroup.Item>
          <ListGroup.Item action href="#areas">
            📂 Áreas
          </ListGroup.Item>
          <ListGroup.Item action href="#metas">
            🎯 Metas
          </ListGroup.Item>
          <ListGroup.Item action href="#projetos">
            📋 Projetos
          </ListGroup.Item>
          <ListGroup.Item action href="#tarefas">
            ✅ Tarefas
          </ListGroup.Item>
          <hr />
          <ListGroup.Item action href="#recursos">
            🛠️ Recursos
          </ListGroup.Item>
          <ListGroup.Item action href="#notas">
            📝 Notas
          </ListGroup.Item>
          <ListGroup.Item action href="#arquivos">
            📁 Arquivos
          </ListGroup.Item>
          <hr />
          <ListGroup.Item action href="#financeiro">
            💳 Financeiro
          </ListGroup.Item>
          <ListGroup.Item action href="#treinos">
            🏋️‍♂️ Treinos
          </ListGroup.Item>
          <ListGroup.Item action href="#leituras">
            📚 Leituras
          </ListGroup.Item>
          <ListGroup.Item action href="#diario">
            📔 Diário
          </ListGroup.Item>
        </ListGroup>
      </div>

      {/* Conteúdo Principal */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        <Container fluid>
          <h3>Produtivo Pessoal</h3>
          <p className="text-muted">
            Para duplicar esse template e começar a usar, clique na opção
            <strong> duplicar </strong> no topo superior direito.
          </p>

          <Row>
            {/* Coluna Captura Rápida */}
            <Col md={4}>
              <Button
                variant="light"
                className="w-100 mb-2"
                onClick={() => handleOpenModal("Nota")}
              >
                Nova Nota
              </Button>
              <Button
                variant="light"
                className="w-100 mb-2"
                onClick={() => handleOpenModal("Tarefa")}
              >
                Nova Tarefa
              </Button>
              <Button
                variant="light"
                className="w-100 mb-2"
                onClick={() => handleOpenModal("Projeto")}
              >
                Novo Projeto
              </Button>
              <Button
                variant="light"
                className="w-100"
                onClick={() => handleOpenModal("Recurso")}
              >
                Novo Recurso
              </Button>
            </Col>

            {/* Coluna Inbox */}
            <Col md={8}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>📥 Inbox</Card.Title>
                  <Card.Text>
                    Aqui você verá suas Notas, Tarefas, Projetos e Recursos criados.
                  </Card.Text>
                  {inboxItems.length > 0 ? (
                    <ListGroup>
                      {inboxItems.map((item) => (
                        <ListGroup.Item key={item.id}>
                          <strong>{item.type}:</strong> {item.name}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p className="text-muted">Nenhum item no Inbox ainda.</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Seção de Planners com Cards */}
          <section id="planners" className="mt-5">
            <h4>Planners</h4>
            <Row className="gy-4">
              <Col md={3}>
                <Card className="text-center shadow-sm">
                  <Card.Img
                    variant="top"
                    src="https://via.placeholder.com/100"
                    style={{ width: "50px", margin: "20px auto" }}
                  />
                  <Card.Body>
                    <Card.Title>💰 Financeiro</Card.Title>
                    <Card.Text>Gerencie suas finanças.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center shadow-sm">
                  <Card.Img
                    variant="top"
                    src="https://via.placeholder.com/100"
                    style={{ width: "50px", margin: "20px auto" }}
                  />
                  <Card.Body>
                    <Card.Title>💪 Treinos</Card.Title>
                    <Card.Text>Organize seus treinos.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center shadow-sm">
                  <Card.Img
                    variant="top"
                    src="https://via.placeholder.com/100"
                    style={{ width: "50px", margin: "20px auto" }}
                  />
                  <Card.Body>
                    <Card.Title>📚 Leituras</Card.Title>
                    <Card.Text>Acompanhe suas leituras.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center shadow-sm">
                  <Card.Img
                    variant="top"
                    src="https://via.placeholder.com/100"
                    style={{ width: "50px", margin: "20px auto" }}
                  />
                  <Card.Body>
                    <Card.Title>📔 Diário</Card.Title>
                    <Card.Text>Registre o seu dia.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </section>
        </Container>
      </div>

      {/* Modal para Adicionar Itens */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar {modalType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="itemName">
              <Form.Label>Nome da {modalType}</Form.Label>
              <Form.Control
                type="text"
                placeholder={`Digite o nome da ${modalType.toLowerCase()}`}
                value={itemData}
                onChange={(e) => setItemData(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddItem}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HomePage;
