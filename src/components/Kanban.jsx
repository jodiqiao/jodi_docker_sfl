import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { uuid } from 'uuidv4';
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const itemsFromBackend = [
  { id: uuid(), content: ' ' },
  { id: uuid(), content: ' ' }
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

/* draggable function, for deleting and updating columns when dragged */
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

function Kanban() {
    const [columns, setColumns] = useState(columnsFromBackend);
    const [todos, setTodos] = useState([]);

    function addTodo(todo) {
      // adds new todo to beginning of todos array
      setTodos([todo, ...todos]);
    }

    return (
      <div style={{
        display:'flex', 
        justifyContent: 'center', 
        height: '100%', 
        marginTop: '30px' 
        }}>
  
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
                                  {/* Text field */}
                                  <TodoForm addTodo={addTodo} />
                                  <TodoList todos={todos} />
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
  );
}

export default Kanban;