const NavBar = () => {
    return (
        <div>
            <div className="wrapper">
                <header>
                    <h1>Forza Horizon Appearance Editor</h1>
                    <p>No more ugly parts on locked tunes.</p>
                    <p className="version">Version 0.0.1</p>
                    <p className="view"><a rel="noreferrer" target="_blank" href="https://github.com/Ldalvik/ForzaTuneEditor">Github</a></p>
                    <ul>
                        <button onClick={()=>window.open("https://github.com/Ldalvik/ForzaTuneEditor", "_blank")} className="btn">Github</button>
                    </ul>
                </header>
            </div>
        </div>
    )
}
export default NavBar