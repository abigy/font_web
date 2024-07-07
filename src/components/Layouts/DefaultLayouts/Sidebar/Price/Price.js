import Input from '../../Content/Input';
import './Price.scss'
function Price({ minPrice, maxPrice, handleChange }) {
  return (
    <div className='pr'>
      <h2 className="sidebar-title price-title">Giá Tiền</h2>
      <label className='price-title'>scale price: {minPrice} - {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(maxPrice)}</label>
      <input onChange={handleChange} type="range" min='0' max='25000000' value={maxPrice}/>
      {/* <span className='checkMark'></span> */}
    </div>
  )
}

export default Price;