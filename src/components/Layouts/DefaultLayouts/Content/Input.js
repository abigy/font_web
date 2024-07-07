function Input({ handleChange, value, name, category }) {
  return (
    <div>
      <label className="sidebar-label-container">
        <input onChange={handleChange} type="radio" value={value} name={name} />
        <span className="checkMark"></span>{category}
      </label>
    </div>
  )
}

export default Input;