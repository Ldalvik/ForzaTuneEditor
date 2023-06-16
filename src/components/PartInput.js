const PartInput = ({id, title, onInputChanged, tuneValue, newTuneValue, description=""}) => {
    return (
        <section>
            <h2 className="part-title">{title}</h2>
            <p>{description}</p>
            <h4 className="part-title">Current part index: {tuneValue}</h4>
            <label>
                New part index
            </label>
            <input 
                id={id} 
                type="number"
                min={-1}
                className="tune-input-box"
                value={newTuneValue} 
                step={1}
                onChange={onInputChanged} />
        </section>
    )
}

export default PartInput