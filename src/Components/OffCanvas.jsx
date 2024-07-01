import React from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import Form from './Form';

const OffCanvas = ({ show, handleClose, handleSaveSegment }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Saving Segment</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form handleSaveSegment={handleSaveSegment} handleClose={handleClose} />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffCanvas;
