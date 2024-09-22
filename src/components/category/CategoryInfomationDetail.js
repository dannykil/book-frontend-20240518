import { ConstructionOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Alert, Col, FloatingLabel, Form, Row } from 'react-bootstrap';

// const CategoryInfomationDetail = ({ onDragEnd, items }) => {
const CategoryInfomationDetail = ({ category }) => {
    console.log('CategoryInfomationDetail');
    console.log("category : ", category);
    console.log("category.categoryDetailDto.length : ", category.categoryDetailDto.length);

    const [show, setShow] = useState(true);
    const [items, setItems] = useState(
        [...Array(category.categoryDetailDto.length)].map((_, i) => ({
            // [...Array(3)].map((_, i) => ({
            id: `${i}`, content: <Alert variant="light" onClose={() => setShow(false)} dismissible>
                <Row className="g-2">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid" label="Category">
                            <Form.Control
                                type="input"
                                placeholder="Category"
                                value={category.categoryDetailDto[i].categoryDetailName}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid" label="Note">
                            <Form.Control
                                type="input"
                                placeholder="note"
                                value={category.categoryDetailDto[i].categoryDetailNote}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
            </Alert>
        })),
    );

    const onDragEnd = ({ source, destination }) => {
        const _items = items;
        const [targetItem] = _items.splice(source.index, 1);
        _items.splice(destination.index, 0, targetItem);
        setItems(_items);
    };

    useEffect(() => {}, []);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        index={index}
                                    >
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default CategoryInfomationDetail;