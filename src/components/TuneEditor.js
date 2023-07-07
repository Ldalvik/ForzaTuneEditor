import React, { useState } from 'react'
import ManualPage from './ManualPage'
import ConfigPage from './ConfigPage'
import { toast } from 'react-toastify'
import ForzaAPI from "../ForzaAPI/ForzaAPI"
import TuneFileHandler from '../ForzaAPI/TuneFileHandler'

const fileHandler = new TuneFileHandler()
const TuneEditor = () => {
    const [isManualMode, setIsManualMode] = useState(true)
    const [hideHelp, setHideHelp] = useState(false)

    const [tuneFiles, setTuneFiles] = useState([])
    const [error, setError] = useState("")
    const [currentTuneData, setCurrentTuneData] = useState({
        api: null,
        id: "",
        location: "",
        version: "",
        title: "",
        description: "",
        uploadDate: "",
        owner: "",

        ordinal: "",
        carBody: "",
        bumperFront: "",
        bumperRear: "",
        wingRear: "",
        hood: "",
        sideskirts: "",
    })

    const [newTuneData, setNewTuneData] = useState({
        carBody: 0,
        bumperFront: 0,
        bumperRear: 0,
        wingRear: 0,
        hood: 0,
        sideskirts: 0,
    })

    function loadTuneFiles() {
        try {
            const tuneFiles = fileHandler.findTuneFiles()
            let forzaAPI = tuneFiles.map((tuneFile) => new ForzaAPI(tuneFile));
            setTuneFiles(forzaAPI)
        } catch (error) {
            console.log(error)
        }
    }

    let handleTuneChange = (e) => {
        if (e.target.value === "Select a tune") return

        let forzaAPI = tuneFiles.find((forzaAPI) => e.target.value === forzaAPI.tuneFile.id)
        setCurrentTuneData({
            api: forzaAPI,
            id: e.target.value,
            location: forzaAPI.tuneFile.tuneFolderPath,
            version: forzaAPI.data.version,
            title: forzaAPI.metadata.getTitle(),
            description: forzaAPI.metadata.getDescription(),
            uploadDate: forzaAPI.metadata.getUploadDate(),
            owner: forzaAPI.metadata.getGamertag(),
            ordinal: forzaAPI.data.ordinal,
            carName: forzaAPI.data.getCarNameFull(),

            ...forzaAPI.getConfig()
        })
        setNewTuneData(forzaAPI.getConfig())
    }

    function saveTuneFile() {
        currentTuneData.api.setConfig(newTuneData)
        if (currentTuneData.api.fileHandler.saveTune(
                currentTuneData.api.tuneFile.tuneFolderPath,
                currentTuneData.id,
                currentTuneData.api.build())
            ) {
            toast.success(`Tune "${currentTuneData.title}" was succesfully patched.`, {
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

    const checkForza = () => {
        if (!fileHandler.checkForzaExists(false)) { // check for steam version eventually
            setError(`It looks like the Microsoft version of Forza wasn't detected on your PC. Make sure ${ForzaAPI.fileHandler.FORZA_PATH} exists and is accessible.`)
        }
    }
    checkForza()

    let loadTuneComponent = <button className="btn fill" onClick={loadTuneFiles}>Load tunes</button>
    if (tuneFiles.length > 0) {
        loadTuneComponent = <select className="btn fill" onChange={handleTuneChange}>
            <option style={{ textAlign: 'center' }} key={0} value={"Select a tune"}>-- Select a tune --</option>
            {tuneFiles.map((forzaAPI) =>
                <option style={{ textAlign: 'center' }} key={forzaAPI.tuneFile.id} value={forzaAPI.tuneFile.id}>
                    {forzaAPI.metadata.getTitle()} ({forzaAPI.data.model})</option>
            )}
        </select>
    }

    const helpText = hideHelp ? "Show" : "Hide"

    return (
        <>
            <section>
                <h1>Editor Mode</h1>
                <p><b>Manual mode: </b>Manually type values into input fields. This is useful for when you only want to change a couple values.</p>
                <p><b>Config mode: </b>Allows you to copy the configuration of a tune and paste it onto another (of the same car). This is useful for when you want to copy the entire appearance of a tune. Reccomended use is to create and save your own tune, and paste that onto the locked tune of your choice.</p>
                <button onClick={() => setIsManualMode(!isManualMode)} className="btn tune-mode-button">
                    SWITCH TO {isManualMode ? "CONFIG" : "MANUAL"} MODE
                </button>
                <button onClick={() => setHideHelp(!hideHelp)} className="btn tune-mode-button">{helpText} Help</button>

            </section>
            {hideHelp ? <></> : <section>
                <h2>How to use:</h2>
                <p>NOTE: Do not have the tune manager open while using this app. It may cause your game to crash.</p>
                <p>Click the "Load tunes" button and wait for it to say "Select a tune". You can then select the tune you'd like to modify.</p>
                <p>Each car has different upgrades available, so be sure you are choosing the correct part index. For example, a car may
                    have 3 hoods available, with the default (stock) hood being index 0, the second upgrade being index 1, and the third being index 2.
                </p>

                <p>When you are done, scroll to the bottom and click "Save tune", You should get a success (or fail) message, and you can then
                    open the tune manager to load your newly modified tune.
                </p>
            </section>}

            <section>
                {loadTuneComponent}
                <p className="error-text">{error}</p>
                <p><b>Title:</b> {currentTuneData.title}</p>
                <p><b>Description:</b> {currentTuneData.description}</p>
                <p><b>Make & Model:</b> {currentTuneData.carName}</p>
                <p><b>Owner:</b> {currentTuneData.owner}</p>
                <p><b>Upload date:</b> {currentTuneData.uploadDate}</p>
                <p><b>Location:</b> <span className="debug">{currentTuneData.location}</span></p>
            </section>

            {
                isManualMode ?
                    <ManualPage
                        newTuneData={newTuneData}
                        setNewTuneData={setNewTuneData}
                        currentTuneData={currentTuneData}
                    /> :
                    <ConfigPage />
            }
            <section>
                <h1>Finish</h1>
                <p>Changes apply instantly, make sure you are not in the tuning menu or catalog, as it may cause crashes.</p>
                <button className="btn" type="button" onClick={saveTuneFile}>Save Tune</button>
                <br />
            </section>
        </>
    )
}


export default TuneEditor