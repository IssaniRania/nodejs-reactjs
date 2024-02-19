import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsPencilSquare,BsPlus } from "react-icons/bs";
import { Modal, Button } from 'react-bootstrap';
import HomePage from "./HomePage";
import CreateCulture from './CreateCulture';
const AutrePage = () => {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const fetchData = async () => {
    try {
      axios.get('http://localhost:3002/cultures')
      .then(response => setData(response.data))
      .catch(error => console.error('Erreur de chargement des Cultures', error));
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleCheckboxChange = (index) => {
    console.error(index);
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(index)) {
        return prevSelectedItems.filter((item) => item !== index);
      } else {
        return [...prevSelectedItems, index];
      }
    });
  };

  const handleDeleteSelected = async () => {
    try {
      const selectedData = selectedItems.map((index) => data[index]);
      const selectedIds = selectedData.map(item => item._id);
  
      console.error(selectedIds);
      await axios.delete(`http://localhost:3002/cultures/${selectedIds.join(',')}`);
      fetchData();
      setSelectedItems([]);
    } catch (error) {
      console.error('An error occurred while deleting data:', error);
    }
  };
  const handleModifier = (index) => {
    const selectedItem = data[index];
    setSelectedData(selectedItem);
    setShowModal(true);
  };
  const handleSaveModification = async () => {
    try {
      if (selectedItems.length === 0) {
        window.alert('Aucun élément sélectionné.');
        return;
      }
  
      const selectedIndex = selectedItems[0]; 
      const selectedData = data[selectedIndex];
      const selectedIds = [selectedData._id];
  
      const nom= document.getElementById('nom').value;

      const description = document.getElementById('description').value;
      const date = document.getElementById('date').value;
  
      const response = await axios.put(`http://localhost:3002/cultures/${selectedIds.join(',')}`, {
        nom: nom,
        description: description,
        date: date,
      });
  
      setShowModal(false);
      fetchData();
  
      if (response.status === 200) {
        window.alert('Modification réussie !');
      } else {
        window.alert('Erreur lors de la modification.');
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la modification des données:', error);
      window.alert('Erreur lors de la modification.');
    }
  };
  
  
  return (
    <div>
      <HomePage />
       <CreateCulture fetchData={fetchData} />
       <button type="button" className="btn btn-danger" onClick={handleDeleteSelected}>
        Supprimer sélection
      </button>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Description</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <th scope="row">
              <input
                  class="form-check-input me-1"
                  type="checkbox"
                  value=""
                  id={`checkbox-${index}`}
                  checked={selectedItems.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                />
              </th>
              <td>{item.nom}</td>
              <td>{item.description}</td>
              <td>{item.date}</td>
              <td>
                <button type="button" class="btn btn-warning" onClick={() => handleModifier(index)}>
                  <BsPencilSquare />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Modifier les données</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <form>
    <div className="mb-3">
      <label htmlFor="nom" className="col-form-label">Nom:</label>
      <input
  type="text"
  className="form-control"
  id="nom"
  value={selectedData ? selectedData.nom : ''}
  onChange={(e) => setSelectedData({ ...selectedData, nom: e.target.value })}
/>



    </div>
    <div className="mb-3">
      <label htmlFor="description" className="col-form-label">Description:</label>
      <input
        type="text"
        className="form-control"
        id="description"
        value={selectedData ? selectedData.description : ''}
        onChange={(e) => setSelectedData({ ...selectedData, description: e.target.value })}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="date" className="col-form-label">Date:</label>
      <input
        type="date"
        className="form-control"
        id="date"
        value={selectedData ? selectedData.date : ''}
        onChange={(e) => setSelectedData({ ...selectedData, date: e.target.value })}
      />
    </div>
  </form>
</Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Fermer
    </Button>
    <Button variant="primary" onClick={handleSaveModification}>
      Sauvegarder
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
}

export default AutrePage;
