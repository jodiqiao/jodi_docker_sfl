import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { uuid } from 'uuidv4';
import * as ReactBootStrap from "react-bootstrap";

const itemsFromBackend = [
  { id: uuid(), content: 'First task' },
  { id: uuid(), content: 'Second task' }
];

const columnsFromBackend = {
    [uuid()]: {
      name: 'Backlog',
      items: itemsFromBackend
    },
    [uuid()]: {
      name: 'Planning',
      items: []
    },
    [uuid()]: {
      name: 'In Progress',
      items: []
    },
    [uuid()]: {
      name: 'Completed',
      items: []
    }
};

/* draggable function*/
const onDragEnd = (result, columns, setColumns) => {
  if(!result.destination) return; /* do nothing if dragged note outside of columns*/
  const { source, destination } = result;
  if(source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    })
  } else {
  const column = columns[source.droppableId];
  const copiedItems = [...column.items];
  const [removed] = copiedItems.splice(source.index, 1);
  copiedItems.splice(destination.index, 0, removed);
  setColumns({
    ...columns,
    [source.droppableId]: {
      ...column,
      items: copiedItems
    }
  })
  }
};

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (

    <div className="App">
    <ReactBootStrap.Navbar bg="danger" variant="dark">
      <ReactBootStrap.Navbar.Brand href="#home">
        <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        Notebeans • SFL
      </ReactBootStrap.Navbar.Brand>
    </ReactBootStrap.Navbar>

    <div style={{ display:'flex', justifyContent: 'center', height: '100%', marginTop: '30px' }}>

      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <h2>{column.name}</h2>
              <div style={{margin: 8}}>
            <Droppable droppableId={id} key={id}>
              {(provided, snapshot) => {
                return (
                  <div 
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver ? '#ffe2c9' : '#fff5ed',
                    padding: 4,
                    width: 250,
                    minHeight:500
                  }}
                  >
                    {column.items.map((item, index) => {
                      return (
                        <Draggable key={item.td} draggableId={item.id} index={index}>
                          {(provided, snapshot) => {
                            return (
                              <div ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: 'none',
                                padding:16,
                                margin: '0 0 8px 0',
                                minHeight: '50px',
                                backgroundColor: '#eb9898',
                                color: 'white',
                                ...provided.draggableProps.style
                              }}
                              >
                                {item.content}
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
            </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
    </div>
  );
}

export default App;
