import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { resetForm, saveSegment } from './Slices/segmentSlice';
import OffCanvas from './Components/OffCanvas';

const App = () => {
  const dispatch = useDispatch();
  const { segmentName, schemas, loading } = useSelector((state) => state.segment);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    dispatch(resetForm());
  };

  const handleShow = () => setShow(true);

  const handleSaveSegment = () => {
    if (!segmentName) {
      alert('Please enter a name for the segment.');
      return;
    }

    if (schemas.length === 0) {
      alert('Please select at least one schema to save the segment.');
      return;
    }

    const segmentData = {
      segment_name: segmentName,
      schema: schemas.map(schema => ({ [schema.value]: schema.label }))
    };

    dispatch(saveSegment(segmentData)).then((response) => {
      if (response.type === 'segment/saveSegment/fulfilled') {
        alert('Segment saved successfully!');
        handleClose();
      } else {
        alert('Failed to save segment. Please try again.');
      }
    });
  };

  return (
    <>
      {loading && <div className='loader-holder'><div className='loader'></div></div>}
      <Button variant="primary position-absolute top-50 start-50 translate-middle" onClick={handleShow}>
        Save segment
      </Button>

      <OffCanvas show={show} handleClose={handleClose} handleSaveSegment={handleSaveSegment} />
    </>
  );
};

export default App;
