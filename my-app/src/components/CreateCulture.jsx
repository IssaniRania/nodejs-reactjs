import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { BsPencilSquare,BsPlus } from "react-icons/bs";
import axios from 'axios';

function CreateCulture({ fetchData }) {
  const [show, setShow] = useState(false);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');

  const handleClose = () => {
    setShow(false);
    setNom('');
    setDescription('');
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/Cultures', {
        nom,
        description
      });
      fetchData();

      if (response.status === 201) {
        window.alert('Ajout avec succès !');
      } else {
        window.alert('Erreur lors de l\'ajout.');
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'ajout des données:', error);
      window.alert('Erreur lors de l\'ajout.');
    }
      }


  return (
    <>
      <button type="button" className="btn btn-primary" onClick={handleShow}>
      <BsPlus />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id="form">
            <Form.Group className="mb-3" controlId="title">
            <label htmlFor="nom" className="col-form-label">Nom</label>
                <Form.Control
                  type="text"
                  placeholder="Nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
            <label htmlFor="description" className="col-form-label">Description</label>
                <Form.Control
                  as="textarea"
                  placeholder="Laissez une description ici"
                  style={{ height: '100px' }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" type="submit" form="form"> Submit </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateCulture;