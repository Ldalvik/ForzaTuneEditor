const PartInput = ({id, title, onInputChanged, tuneValue}) => {
    return (
        <section>
            <h2 className="part-title">{title}</h2>
            <input 
                id={id} 
                type="number"
                min={0}
                className="tune-input-box"
                value={tuneValue} 
                step={1}
                onChange={onInputChanged} />
        </section>
    )
}

export default PartInput