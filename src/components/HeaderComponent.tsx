import React, { useState, useCallback } from 'react';
import { DndProvider} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { FormControl } from '@material-ui/core';
import StateItem from '../types/StateItem';
import DraggableState from './DraggableState';

/**
 * HeaderComponent Props
 */
interface HeaderProps {
  onStatesChanged: (selectedStates: string[]) => void; // callback when state is changed.
}

/**
 * The component represents the header in the app. Allows the user to add/remove states to the dashboard and also rearrange the order.
 * Uses a drop down to selecting states. Uses a button to remove states. Used DraggableState to rearrange.
 * @param HeaderProps 
 */
const HeaderComponent: React.FC<HeaderProps> = ({ onStatesChanged }) => {
  const [selectedStates, setSelectedStates] = useState<StateItem[]>([]);
  const [availableStates, setAvailableStates] = useState<StateItem[]>([
    { id: 'tn', name: 'Tennessee' },
    { id: 'md', name: 'Maryland' },
    { id: 'wa', name: 'Washington' },
    { id: 'oh', name: 'Ohio' },
    { id: 'fl', name: 'Florida' },
    { id: 'az', name: 'Arizona' },
    { id: 'wi', name: 'Wisconsin' },
    { id: 'ri', name: 'Rhode Island' },
    { id: 'ga', name: 'Georgia' },
    { id: 'ky', name: 'Kentucky' },
  ]);

  // if a user moved the state box to a different position in the list.
  const moveState = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const statesCopy: StateItem[] = [...selectedStates];
      const [removed] = statesCopy.splice(dragIndex, 1);
      statesCopy.splice(hoverIndex, 0, removed);

      setSelectedStates(statesCopy);
      onStatesChanged(statesCopy.map((state) => state.id));
    },
    [onStatesChanged, selectedStates]
  );

  // function if a new state is added to the list by the used.
  // There is a limit of 5 in the list/
  // If a user try to put more than five they are alerted with an alert box.
  const addState = (stateId: string) => {
    const selectedState = availableStates.find((state) => state.id === stateId);

    if (selectedState && selectedStates.length < 5 && !selectedStates.find((s) => s.id === selectedState.id)) {
      const updatedSelectedStates: StateItem[] = [...selectedStates, selectedState];
      setSelectedStates(updatedSelectedStates);
      onStatesChanged(updatedSelectedStates.map((state) => state.id));
      const updatedAvailableStates = availableStates.filter((state) => state.id !== stateId);
      setAvailableStates(updatedAvailableStates);
    } else if (selectedStates.length >= 5) {
      alert('You can only select up to five states. Please remove a state before adding another one.');
    }
  };

  // function to remove states from the list if the user clicks remove button on the stat box.
  const removeState = (stateId: string) => {
    const removedState: StateItem | undefined = selectedStates.find((state) => state.id === stateId);

    if (removedState) {
      const updatedSelectedStates: StateItem[] = selectedStates.filter((state) => state.id !== stateId);
      setSelectedStates(updatedSelectedStates);
      onStatesChanged(updatedSelectedStates.map((state) => state.id));
      setAvailableStates([...availableStates, removedState]);
    }
  };
  // complex html5 backend stuff below...
  return (
    <Box>
      <Box mt={1}>
        <FormControl>
          <InputLabel id="labelId">Select State</InputLabel>
          <Select value="" labelId="labelId" onChange={(e) => addState(e.target.value)} autoWidth>
            {availableStates.map((state) => (
              <MenuItem key={state.id} value={state.id}>
                {state.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <DndProvider backend={HTML5Backend}>
        <Box>
          {selectedStates.map((state, index) => (
            <DraggableState
              key={state.id}
              state={state}
              index={index}
              moveState={moveState}
              removeState={() => removeState(state.id)}
            />
          ))}
        </Box>
      </DndProvider>
    </Box>
  );
};

export default HeaderComponent;
