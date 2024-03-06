import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const SectorCheckbox = ({ sector, selectedSector, handleSectorChange }) => {

    const handleChange = () => {
        if (sector === selectedSector) {
            // If the sector is already selected, deselect it
            handleSectorChange("");
        } else {
            // Otherwise, select the clicked sector
            handleSectorChange(sector);
        }
    };


    return (
        <FormControlLabel
            control={<Checkbox checked={sector === selectedSector} onChange={handleChange} />}
            label={sector}
            className='w-1/2'
        />
    );
};

export default SectorCheckbox;
