import React, { useState } from 'react'
import TuningAPI from '../TuningAPI/core/TuningAPI'
import PartInput from './PartInput'

const Home = () => {
    const [currentState, setCurrentState] = useState({
        api: null, tuneFileName: null, error: null,
        ordinal: null,
        carBody: 0,
        frontBumper: 0,
        rearBumper: 0,
        rearWing: 0,
        hood: 0,
        sideskirts: 0,
        //rims: 0
    })

    const onTuneFileUpload = async (e) => {
        const uploadedFile = e.target.files[0]
        const tuneFileBytes = Array.from(new Uint8Array(await uploadedFile.arrayBuffer()))
        const api = new TuningAPI(tuneFileBytes)
        if (api.tuneFile.length === 378) {
            setCurrentState({
                api: api, tuneFileName: uploadedFile.name,
                ordinal: api.getOrdinal(),
                carBody: api.getCarBody(),
                frontBumper: api.getFrontBumper(),
                rearBumper: api.getRearBumper(),
                rearWing: api.getRearWing(),
                hood: api.getHood(),
                sideskirts: api.getSideskirts(),
                //rims: api.getRims(),
                //turbo: api.getTurbo()
            })
        } else {
            setCurrentState({ ...currentState, error: `File is not 378 bytes. (${api.tuneFile.length} bytes)` })
        }
    }

    function downloadTuneFile() {
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
        
        const obj = URL.createObjectURL(new Blob([api.tuneFile], { type: 'application/octet-stream' }))
        document.createElement('a', { 
            href: obj, 
            download: currentState.tuneFileName 
        }).dispatchEvent(new MouseEvent('click'))
        URL.revokeObjectURL(obj)
    }

    const onInputChange = (e) => setCurrentState({ ...currentState, [e.target.id]: e.target.value })

    return (
        <div>
            <section>
                <h1>About</h1>
                <p>Change the appearance of locked tunes from any Forza Horizon title. This website is not affiliated with</p>
            </section>

            <section>
                <h1>Upload Tune File</h1>
                <p>All values will be saved when you click download.</p>

                <input type="file" onChange={onTuneFileUpload} />

                <p className="error-text">{currentState.error}</p>
                <p>Ordinal: {currentState.ordinal}</p>
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
                <p>Replace the file you uploaded with the file downloaded here. Make sure the file name is exactly the same,
                    remove any trailing text like `_1` or `(1)`. Microsoft tune files have NO extension, steam tune files will end in .Data
                </p>
                <button className="btn" type="button" onClick={downloadTuneFile}>Download</button>
                <br />
            </section>
        </div>
    )
}


export default Home