const NavBar = ({ isTutorial, onButtonClick }) => {
    return (
        <div>
            <div className="wrapper">
                <header>
                    <h1>Forza Horizon Appearance Editor</h1>
                    <p>No more ugly parts on locked tunes.</p>
                    <p className="version">Version 0.0.1</p>
                    <ul>
                        <button className="btn" onClick={onButtonClick}>{isTutorial ? "Editor" : "Tutorial"}</button>
                    </ul>
                </header>
            </div>
        </div>
    )
}
export default NavBar