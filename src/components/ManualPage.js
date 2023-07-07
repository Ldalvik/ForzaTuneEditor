import React from 'react'
import PartInput from './PartInput'

const ManualPage = ({ newTuneData, setNewTuneData, currentTuneData }) => {
    const onInputChange = (e) => setNewTuneData({ ...newTuneData, [e.target.id]: e.target.value })
    return (
        <>
            <PartInput
                id="hood"
                title="Hood"
                onInputChanged={onInputChange}
                tuneValue={currentTuneData.hood}
                newTuneValue={newTuneData.hood}
            />

            <PartInput
                id="bumperFront"
                title="Front Bumper"
                onInputChanged={onInputChange}
                tuneValue={currentTuneData.bumperFront}
                newTuneValue={newTuneData.bumperFront}
            />

            <PartInput
                id="bumperRear"
                title="Rear Bumper"
                onInputChanged={onInputChange}
                tuneValue={currentTuneData.bumperRear}
                newTuneValue={newTuneData.bumperRear}
            />

            <PartInput
                id="sideskirts"
                title="Sideskirts"
                onInputChanged={onInputChange}
                tuneValue={currentTuneData.sideskirts}
                newTuneValue={newTuneData.sideskirts}
            />

            <PartInput
                id="wingRear"
                title="Rear Wing"
                onInputChanged={onInputChange}
                tuneValue={currentTuneData.wingRear}
                newTuneValue={newTuneData.wingRear}
            />

            <PartInput
                id="carBody"
                title="Car Body (Bodykit)"
                description="NOTE: To make sure you get the exact setup you want, create and save a tune with your preferred modifications and view it here. Copy down each value, and apply it to the tune you want. Bodykits can have odd indexes such as '200' instead of 2, and this will sometimes affect other appearance index values."
                onInputChanged={onInputChange}
                tuneValue={currentTuneData.carBody}
                newTuneValue={newTuneData.carBody}
            />

            {/* <PartDropdown
                id="rims"
                title="Rims"
                onInputChanged={onInputChange}
                tuneValue={currentState.rims}
            /> */}

            {/*<PartDropdown
                id="turbo"
                title="Turbo"
                onInputChanged={onInputChange}
                tuneValue={currentState.carBody}
            /> */}
        </>
    )
}


export default ManualPage