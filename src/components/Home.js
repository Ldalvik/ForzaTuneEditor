import React, { useState } from 'react'
import TuningAPI from '../TuningAPI/core/TuningAPI'
import PartInput from './PartInput'
import TuneFileHandler from '../TuningAPI/core/TuneFileHandler'
import { toast } from 'react-toastify'

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
        //rims: "", 
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
            console.log(error)
        }
    }

    let handleTuneChange = (e) => {
        if (e.target.value === "Select a tune") return

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
        if (saveTune(currentState.tuneFileId, api.tuneFile)) {
            toast.success(`Tune "${currentState.tuneTitle}" was succesfully patched.`, {
                position: "bottom-center", autoClose: 1250, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: true,
                progress: undefined, theme: "colored"
            })
        } else {
            toast.error(`There was a problem saving the file :( Maybe try again?`, {
                position: "bottom-center", autoClose: 2500, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: true,
                progress: undefined, theme: "colored"
            })
        }
    }

    const onInputChange = (e) => setCurrentState({ ...currentState, [e.target.id]: e.target.value })

    const checkForza = async () => {
        const fileHandler = new TuneFileHandler()
        if (!await fileHandler.checkForzaExists(false)) { // check for steam version eventually
            setCurrentState({
                ...currentState,
                error: `It looks like the Microsoft version of Forza wasn't detected on your PC. Make sure ${fileHandler.FORZA_PATH} exists and is accessible.`
            })
        }
    }
    checkForza()

    return (
        <div>
            <section>
                <h2>How to use:</h2>
                <p>NOTE: Do not have the tune manager open while using this app. It may cause your game to crash.</p>
                <p>Click the "Select a tune" dropdown and wait for the tune files to load. Select the tune you'd like to modify.</p>
                <p>Each car has different upgrades available, so be sure you are choosing the correct part index. For example, a car may
                    have 3 hoods available, with the default (stock) hood being index 0, the second upgrade being index 1, and the third being index 2.
                </p>

                <p>When you are done, scroll to the bottom and click "Save tune", You should get a success (or fail) message, and you can then
                    open the tune manager to load your newly modified tune.
                </p>
                
            </section>

            <section>
                <select class="btn" onClick={loadTuneFiles} onChange={handleTuneChange}>
                    <option style={{ textAlign: 'center' }} key={0} value={"Select a tune"}>-- Select a tune --</option>
                    {currentState.tuneFiles.map((tuneFile) => <option key={tuneFile.id} value={tuneFile.id}>{tuneFile.metadata.getGamertag()}  -  {tuneFile.metadata.getTitle()}</option>)}
                </select>
                <p className="error-text">{currentState.error}</p>
                <p><b>Title:</b> {currentState.tuneTitle}</p>
                <p><b>Description:</b> {currentState.tuneDescription}</p>
                <p><b>Ordinal:</b> {currentState.ordinal}</p>
                <p><b>Owner:</b> {currentState.tuneOwner}</p>
                <p><b>Upload date:</b> {currentState.tuneUploadDate}</p>
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