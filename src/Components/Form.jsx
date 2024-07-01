import React from 'react';
import { Form, Row, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setSegmentName, addSchema, removeSchema } from '../Slices/segmentSlice';

const MyForm = ({ handleSaveSegment, handleClose }) => {
  const dispatch = useDispatch();
  const { segmentName, schemas, availableSchemas } = useSelector((state) => state.segment);

  return (
    <Form>
      <Form.Group controlId="formSegmentName">
        <Form.Label>Enter the Name of the Segment</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name of the segment"
          value={segmentName}
          onChange={(e) => dispatch(setSegmentName(e.target.value))}
          required
        />
      </Form.Group>
      <p>To save your segment, you need to add the schemas to build the query</p>
      <div className="border border-primary p-3 mb-3">
        {schemas.map((schema, index) => (
          <Row key={index} className="mb-2">
            <Col>
              <Form.Control readOnly value={schema.label} />
            </Col>
            <Col xs="auto">
              <Button variant="outline-danger" onClick={() => dispatch(removeSchema(index))}>-</Button>
            </Col>
          </Row>
        ))}
        <Row>
          <Col>
            <DropdownButton
              title="Add schema to segment"
              onSelect={(e) => dispatch(addSchema(e))}
            >
              {availableSchemas.length > 0 ? availableSchemas.map(schema => (
                <Dropdown.Item key={schema.value} eventKey={schema.value}>
                  {schema.label}
                </Dropdown.Item>
              )) : (
                <Dropdown.Item disabled>
                  No Schema is there
                </Dropdown.Item>
              )}
            </DropdownButton>
          </Col>
        </Row>
      </div>

      <div className="position-absolute bottom-0 w-100 d-flex justify-content-end p-3 gap-3 bg-light start-0">
        <Button variant="danger" onClick={handleClose}>Cancel</Button>
        <Button variant="success" onClick={handleSaveSegment}>Save the Segment</Button>
      </div>
    </Form>
  );
};

export default MyForm;
