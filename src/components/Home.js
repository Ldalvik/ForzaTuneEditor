import React, { useEffect, useState } from 'react'
import PartInput from './PartInput'
import { toast } from 'react-toastify'
import ForzaAPI from '../TuningAPI/core/ForzaAPI'

const Home = () => {
    const [currentTuneData, setCurrentTuneData] = useState({
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
        // rims: "",
        // turbo: ""
    })

    const [newTuneData, setNewTuneData] = useState({
        carBody: 0,
        bumperFront: 0,
        bumperRear: 0,
        wingRear: 0,
        hood: 0,
        sideskirts: 0,
        //rims: 0,
        //turbo: 0
    })

    const [forzaAPI, setForzaAPI] = useState(new ForzaAPI())
    const [tuneFiles, setTuneFiles] = useState([])
    const [error, setError] = useState("")

    let handleTuneChange = (e) => {
        if (e.target.value === "Select a tune") return

        forzaAPI.setTuneFileById(e.target.value)
        setCurrentTuneData({
            id: e.target.value,
            location: forzaAPI.metadata.tuneFolderPath,
            version: forzaAPI.data.getVersion(),
            title: forzaAPI.metadata.getTitle(),
            description: forzaAPI.metadata.getDescription(),
            uploadDate: forzaAPI.metadata.getUploadDate(),
            owner: forzaAPI.metadata.getGamertag(),

            ordinal: forzaAPI.data.getOrdinal(),
            carBody: forzaAPI.upgrades.getCarBody(),
            bumperFront: forzaAPI.upgrades.getBumperFront(),
            bumperRear: forzaAPI.upgrades.getBumperRear(),
            wingRear: forzaAPI.upgrades.getWingRear(),
            hood: forzaAPI.upgrades.getHood(),
            sideskirts: forzaAPI.upgrades.getSideskirts(),
            //rims: forzaAPI.upgrades.getRims(),
            //turbo: forzaAPI.upgrades.getTurbo(),
            //twinTurbo: forzaAPI.upgrade.getTwinTurbo(),
            //quadTurbo: forzaAPI.upgrades.getQuadTurbo(),
        })
        setNewTuneData({
            carBody: forzaAPI.upgrades.getCarBody(),
            bumperFront: forzaAPI.upgrades.getBumperFront(),
            bumperRear: forzaAPI.upgrades.getBumperRear(),
            wingRear: forzaAPI.upgrades.getWingRear(),
            hood: forzaAPI.upgrades.getHood(),
            sideskirts: forzaAPI.upgrades.getSideskirts(),
            //rims: forzaAPI.upgrades.getRims(),
            //turbo: forzaAPI.upgrades.getTurbo(),
            //twinTurbo: forzaAPI.upgrade.getTwinTurbo(),
            //quadTurbo: forzaAPI.upgrades.getQuadTurbo(),
        })
    }

    const saveTune = async (tuneId, tuneData) => forzaAPI.fileHandler.saveTuneById(tuneId, tuneData)

    async function loadTuneFiles() {
        try {
            setTuneFiles(await forzaAPI.loadTuneFiles())
        } catch (error) {
            console.log(error)
        }
    }

    function saveTuneFile() {
        forzaAPI.upgrades.setCarBody(newTuneData.carBody)
        forzaAPI.upgrades.setBumperFront(newTuneData.bumperFront)
        forzaAPI.upgrades.setBumperRear(newTuneData.bumperRear)
        forzaAPI.upgrades.setWingRear(newTuneData.wingRear)
        forzaAPI.upgrades.setHood(newTuneData.hood)
        forzaAPI.upgrades.setSideskirts(newTuneData.sideskirts)
        //forzaAPI.upgrades.setRims(newTuneData.rims)
        //forzaAPI.upgrades.setTurbo(newTuneData.turbo)
        if (saveTune(currentTuneData.id, forzaAPI.build())) {
            toast.success(`Tune "${currentTuneData.tuneTitle}" was succesfully patched.`, {
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

    const onInputChange = (e) => setNewTuneData({ ...newTuneData, [e.target.id]: e.target.value })

    const checkForza = async () => {
        if (!await forzaAPI.fileHandler.checkForzaExists(false)) { // check for steam version eventually
            setError(`It looks like the Microsoft version of Forza wasn't detected on your PC. Make sure ${forzaAPI.fileHandler.FORZA_PATH} exists and is accessible.`)
        }
    }
    checkForza()

    let loadTuneComponent = <button className="btn fill" onClick={loadTuneFiles}>Load tunes</button>
    if (tuneFiles.length > 0) {
        loadTuneComponent = <select className="btn fill" onChange={handleTuneChange}>
            <option style={{ textAlign: 'center' }} key={0} value={"Select a tune"}>-- Select a tune --</option>
            {tuneFiles.map((tuneFile) =>
                <option key={tuneFile.id} value={tuneFile.id}>
                    {tuneFile.metadata.getGamertag()}  -  {tuneFile.metadata.getTitle()}</option>
            )}
        </select>
    }
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
                {loadTuneComponent}
                <p className="error-text">{error}</p>
                <p><b>Title:</b> {currentTuneData.title}</p>
                <p><b>Description:</b> {currentTuneData.description}</p>
                <p><b>Ordinal:</b> {currentTuneData.ordinal}</p>
                <p><b>Owner:</b> {currentTuneData.owner}</p>
                <p><b>Upload date:</b> {currentTuneData.uploadDate}</p>
                <p><b>Location:</b> <span className="debug">{currentTuneData.location}</span></p>
            </section>

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
                description="NOTE: To make sure you get the exact setup you want, create a tune and view it here. Copy down each value, and apply it to the tune you want. Bodykits can have odd indexes such as '200' instead of 2, and this will sometimes affect other appearance index values."
                onInputChanged={onInputChange}
                tuneValue={currentTuneData.carBody}
                newTuneValue={newTuneData.carBody}
            />

            {/* <PartInput
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