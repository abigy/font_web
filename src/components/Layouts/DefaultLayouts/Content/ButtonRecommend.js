
import { useNavigate } from 'react-router-dom';

function ButtonRecommend({ data_product, filterItems, typeProducts, changeFilterType }) {
  return (
    <div>
      <h3 className='type-title'>Sản phẩm</h3>
      <div className="type-btn">
        <button onClick={() => changeFilterType()} className="btns" >All</button>
        {data_product?.map((val, index) => (
          <button key={index}
            onClick={() => filterItems(val)}
            className="btns" >{val}</button>
        ))}
      </div>
    </div>
  )
}

export default ButtonRecommend;