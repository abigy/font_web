import './Features.scss'

function Features({ data_product2, filterItems2, setProductdb, products }) {

  return (
    <div className='pr feature-marL'>
      <h2 className="sidebar-title price-title">Tính năng</h2>
      <label className="sidebar-label-container">
        <input onClick={() => setProductdb(products)} type="radio" value="" name='test' />
        <span className='checkMark'></span>All
      </label>


      {data_product2?.map((val, index) => (
        <div key={index} >
          <label className='sidebar-label-container'>
            <input onClick={() => filterItems2(val)} type="radio" value={val} name='test' />
            <span className='checkMark'></span>{val}
          </label>
        </div>
      ))}


    </div>
  )
}

export default Features;