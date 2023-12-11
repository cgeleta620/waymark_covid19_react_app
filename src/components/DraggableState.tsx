import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Button, Paper } from '@mui/material';
import StateItem from '../types/StateItem';
import '../styles/components/DraggableStateStyle.css';


/**
 * Props for DraggableState.
 */
interface DraggableStateProps {
  state: StateItem; // the state in the box.
  index: number; // position in list
  moveState: (dragIndex: number, hoverIndex: number) => void; // callback for moving a state
  removeState: () => void; // callback for removing a state.
}

/**
 * The function represents the state box/remove button in the selected states. Used to move the order around of the states.
 * @param DraggableStateProps 
 */
const DraggableState: React.FC<DraggableStateProps> = ({ state, index, moveState, removeState }) => {
  
  const [, ref] = useDrag({
    type: 'STATE',
    item: { index, id: state.id, name: state.name },
  });

  const [, drop] = useDrop({
    accept: 'STATE',
    hover: (item: { index: number }) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveState(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  return (
    <Paper ref={(node) => ref(drop(node))} className="draggableStateContainer">
      {state.name}
      <Button onClick={removeState} className="removeButton" variant="outlined" size="small">
        Remove
      </Button>
    </Paper>
  );
};

export default DraggableState;
