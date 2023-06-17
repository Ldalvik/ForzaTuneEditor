import { useEffect, useState } from "react"

const NavBar = () => {
    const CURRENT_VERSION = "0.0.1"
    const [newVersionAvailable, setNewVersionAvailable] = useState("")

    const checkForUpdate = async () => {
        try {
            const response = await fetch("https://raw.githubusercontent.com/Ldalvik/ForzaTuneEditor/version-0.0.1a/version.txt")
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`)
            }
            const version = await response.text()
            if(version !== CURRENT_VERSION) setNewVersionAvailable(`(UPDATE AVAILABLE: ${version})`)

        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        checkForUpdate()
    },[])

    return (
        <div>

            <div className="wrapper">
                <header>
                    <h1>Forza Horizon Appearance Editor</h1>
                    <p>No more ugly parts on locked tunes.</p>
                    <p className="version">Version {CURRENT_VERSION} {newVersionAvailable}</p>
                    <p className="view"><a rel="noreferrer" target="_blank" href="https://github.com/Ldalvik/ForzaTuneEditor">Github</a></p>
                    <ul>
                        <button onClick={() => window.open("https://github.com/Ldalvik/ForzaTuneEditor", "_blank")} className="btn">Github</button>
                    </ul>
                </header>
            </div>
        </div>
    )
}
export default NavBar