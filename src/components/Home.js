import React, { useState, useEffect } from 'react'
import TuningAPI from '../TuningAPI/core/TuningAPI'
import PartInput from './PartInput'
import TuneFileHandler from '../TuningAPI/core/TuneFileHandler'

const Home = () => {
    const [currentState, setCurrentState] = useState({
        fileHandler: null,
        tuneFiles: [],
        api: null,
        tuneFileId: null,
        error: null,
        ordinal: null,
        carBody: 0,
        frontBumper: 0,
        rearBumper: 0,
        rearWing: 0,
        hood: 0,
        sideskirts: 0,
        //rims: 0, 
        //turbo: 0
    })

    async function loadTuneFiles() {
        const fileHandler = new TuneFileHandler()
        try {
            await fileHandler.loadTuneFiles()
            setCurrentState({
                ...currentState,
                tuneFiles: fileHandler.tuneFiles,
                fileHandler: fileHandler
            })
        } catch (error) {
            console.log(error);
        }
    }

    let handleTuneChange = (e) => {
        const tuneFile = currentState.tuneFiles.find((tuneFile) => tuneFile.id === e.target.value)
        const api = new TuningAPI(tuneFile.data)
        setCurrentState({
            ...currentState,
            api: api,
            tuneFileId: tuneFile.id,
            ordinal: api.getOrdinal(),
            carBody: api.getCarBody(),
            frontBumper: api.getFrontBumper(),
            rearBumper: api.getRearBumper(),
            rearWing: api.getRearWing(),
            hood: api.getHood(),
            sideskirts: api.getSideskirts(),
            tuneTitle: tuneFile.metadata.getTitle(),
            tuneDescription: tuneFile.metadata.getDescription(),
            tuneUploadDate: tuneFile.metadata.getUploadDate(),
            tuneOwner: tuneFile.metadata.getGamertag(),
            //rims: api.getRims(),
            //turbo: api.getTurbo()
        })
    }

    const saveTune = async (tuneFileId, tuneFile) => currentState.fileHandler.saveTune(tuneFileId, tuneFile)

    function saveTuneFile() {
        const api = currentState.api
        api.setCarBody(currentState.carBody)
        api.setFrontBumper(currentState.frontBumper)
        api.setRearBumper(currentState.rearBumper)
        api.setRearWing(currentState.rearWing)
        api.setHood(currentState.hood)
        api.setSideskirts(currentState.sideskirts)
        api.setSideskirts(currentState.sideskirts)
        // api.setRims(currentState.rims)
        // api.setTurbo(currentState.turbo)
        saveTune(currentState.tuneFileId, api.tuneFile)
       // loadTuneFiles() // reload tune files to reflect changes
    }

    const onInputChange = (e) => setCurrentState({ ...currentState, [e.target.id]: e.target.value })

    const checkForza = async () => {
        const fileHandler = new TuneFileHandler()
        if (!await fileHandler.checkForzaExists(false)) { // check for steam version eventually
            setCurrentState({
                ...currentState,
                error: `It seems that the Microsoft version of Forza wasn't detected on your PC. Make sure ${fileHandler.FORZA_PATH} exists and is accesible.`
            })
        }
    }
    checkForza()

    return (
        <div>
            <section>
                <h1>About</h1>
                <p>Change the appearance of locked tunes from any Forza Horizon title.</p>
            </section>

            <section>
                <select class="btn" onClick={loadTuneFiles} onChange={handleTuneChange}>
                    <option style={{textAlign:'center'}} key={0} value={"Select a tune"}>-- Select a tune --</option>
                    {currentState.tuneFiles.map((tuneFile) => <option key={tuneFile.id} value={tuneFile.id}>{tuneFile.metadata.getTitle()}</option>)}
                </select>
                <p className="error-text">{currentState.error}</p>
                <p>Ordinal: {currentState.ordinal}</p>
                <p>Title: {currentState.tuneTitle}</p>
                <p>Owner: {currentState.tuneOwner}</p>
                <p>Description: {currentState.tuneDescription}</p>
                {/* <p>Upload date: {currentState.tuneUploadDate}</p> */}
            </section>

            <PartInput
                id="hood"
                title="Hood"
                onInputChanged={onInputChange}
                tuneValue={currentState.hood}
            />

            <PartInput
                id="frontBumper"
                title="Front Bumper"
                onInputChanged={onInputChange}
                tuneValue={currentState.frontBumper}
            />

            <PartInput
                id="rearBumper"
                title="Rear Bumper"
                onInputChanged={onInputChange}
                tuneValue={currentState.rearBumper}
            />

            <PartInput
                id="sideskirts"
                title="Sideskirts"
                onInputChanged={onInputChange}
                tuneValue={currentState.sideskirts}
            />

            <PartInput
                id="rearWing"
                title="Rear Wing"
                onInputChanged={onInputChange}
                tuneValue={currentState.rearWing}
            />

            <PartInput
                id="carBody"
                title="Car Body (Bodykit)"
                onInputChanged={onInputChange}
                tuneValue={currentState.carBody}
            />

            {/* <PartDropdown
                id="rims"
                title="Rims"
                onInputChanged={onInputChange}
                tuneValue={currentState.rims}
            />

            <PartDropdown
                id="turbo"
                title="Turbo"
                onInputChanged={onInputChange}
                tuneValue={currentState.carBody}
            /> */}

            <section>
                <h1>Finish</h1>
                <p>Changes apply instantly, make sure you are not in the tuning menu or catalog, as it may cause crashes.</p>
                <button className="btn" type="button" onClick={saveTuneFile}>Save Tune</button>
                <br />
            </section>
        </div>
    )
}


export default Home