import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';

const columnsFromBackend = {
    [uuid()]: {
      name: 'Todo',
      items: []
    }
}

function App() {
  return (
    <div style={{ display:'flex', justifyContent: 'center', height: '100%' }}>
      <DragDropContext onDropEnd={result => console.log(result)}>


      </DragDropContext>

    </div>
  );
}

export default App;
