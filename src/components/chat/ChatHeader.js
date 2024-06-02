import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchCategoryListAction } from '../../modules/categoryList';
import Searching from '../layouts/Searching';

const ChatHeader = ({}) => {
  return (
    <>
      <Card className="mb-2">
        <Card.Header as="h3">Chat</Card.Header>
        <Card.Body>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default React.memo(ChatHeader);
