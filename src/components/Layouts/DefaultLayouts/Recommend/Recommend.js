import { useEffect, useState } from 'react';
import Button from '../Content/ButtonRecommend';
import './Recommend.scss';

function Recommend() {
  const [productdb, setProductdb] = useState([])

  const getData = () => {
    fetch('http://localhost:8000/data')
      .then(response => response.json())
      .then(res => setProductdb(res))
  }

  const data_product = [...new Set(productdb.map((val) => val.category))]

  const filterItems = (cat) => {
    const newItems = productdb.filter((newVal) => newVal.category === cat)
    setProductdb(newItems)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <h3 className='type-title'>Sản phẩm</h3>
      <div className="type-btn">
        <Button
          data_product={data_product}
          filterItems={filterItems}
          setProductdb={setProductdb}
        />
      </div>
    </div>
  )
}
export default Recommend;