import Input from '../../Content/Input';
import './Category.scss'

function Category({ handleChange }) {
  return (
    <div>

      <h2 className="sidebar-title">Hãng sản xuất</h2>
      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name='test' />
          <span className='checkMark'></span>All
        </label>

        <Input
          handleChange={handleChange}
          value="Apple"
          category="Apple"
          name="test"
        ></Input>

        <Input
          handleChange={handleChange}
          value="Oppo"
          category="Oppo"
          name="test"
        ></Input>

        <Input
          handleChange={handleChange}
          value="Xiaomi"
          category="Xiaomi"
          name="test"
        ></Input>

        <Input
          handleChange={handleChange}
          value="SamSung"
          category="SamSung"
          name="test"
        ></Input>

        <Input
          handleChange={handleChange}
          value="ViVo"
          category="ViVo"
          name="test"
        ></Input>

      </div>
    </div>
  )
}

export default Category;