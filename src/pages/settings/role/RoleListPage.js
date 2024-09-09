import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
// import { Responsive, WidthProvider } from 'react-grid-layout'; // npm install react-grid-layout
// npm install react-beautiful-dnd --save
// 참고 : https://bepyan.github.io/blog/dnd-master/6-react-beautiful-dnd

const RoleListPage = () => {
    console.log('RoleListPage.js');

    // --- Mock 데이터
    // const items = [...Array(4)].map((_, i) => ({ id: `${i}${i}${i}`, content: `item-${i}` }));
    const [items, setItems] = useState(
        [...Array(4)].map((_, i) => ({ id: `${i}${i}${i}`, content: `item-${i}` })),
    );

    // --- Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트
    // const onDragEnd = ({ source, destination }: DropResult) => {
    //     console.log('>>> source', source);
    //     console.log('>>> destination', destination);
    // };
    const onDragEnd = ({ source, destination }) => {
        console.log('>>> source', source);
        console.log('>>> destination', destination);

        // 깊은 복사
        // const _items = JSON.parse(JSON.stringify(items)) as typeof items;
        console.log('>>> items', items);
        const _items = JSON.parse(JSON.stringify(items));
        console.log('>>> _items', _items);
        // 기존 아이템 뽑아내기
        const [targetItem] = _items.splice(source.index, 1);
        console.log('>>> targetItem', targetItem);
        // 기존 아이템을 새로운 위치에 삽입하기
        _items.splice(destination.index, 0, targetItem);
        // 상태 변경
        setItems(_items);
    };

    // --- requestAnimationFrame 초기화
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));

        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);

    if (!enabled) {
        return null;
    }
    // --- requestAnimationFrame 초기화 END

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    // 1. Droppable > provided
                    // 1.1) provided.innerRef
                    // 라이브러리에서 우리 컴포넌트 DOM을 조작하기 위해서 필수로 등록해줘야 한다.
                    // 1.2) provided.droppableProps
                    // It currently contains data attributes that we use for styling and lookups.
                    // 우리가 전달한 props를 라이브러리에서 사용할 수 있는 형태로 DOM data에 등록시켜주는 것 같다.
                    // 1.3) provided.placeholder
                    // This is used to create space in the <Droppable /> as needed during a drag.
                    // drop될 때 공간을 만들기 위해서 필요하다고 한다. 없어도 동작은 되는 것 같긴하다...
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {items.map((item, index) => (
                            // 2. Draggable > provided
                            // 2.1) provided.innerRef
                            // droppable과 같다.
                            // 2.2) provided.draggableProps
                            // contains a data attribute and an inline style.
                            // drag 스타일을 등록해주는 역할이다. 이게 없다면 엘리먼트가 움직이지 않을 것이다.
                            // 2.3) provided.dragHandleProps
                            // drag handle를 등록해주는 인자인데 살펴보면 내부로직이 어떻게 구현했는지 조금 힌트를 얻을 수 있다.
                            // 2.3.1) data-rbd-drag-handle-draggable-id
                            // 2.3.2) data-rbd-drag-handle-context-id
                            // 2.3.3) aria-labelledby
                            // screen reader가 연관된 엘리먼트를 읽을 수 있도록 해준다.
                            // 2.3.4) tabIndex
                            // 키보드 탭으로 엘리먼트를 접근할 수 있게 해준다.
                            // 2.3.5) draggable
                            // 2.3.6) onDragStart
                            // onDragStart를 통해서 이벤트를 등록해준다.
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
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

export default RoleListPage;
