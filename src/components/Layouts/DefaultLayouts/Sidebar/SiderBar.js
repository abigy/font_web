import Category from './Category/Category'
import Features from '../Features/Features'
import Price from './Price/Price'
import './SideBar.scss'
import { useState, useEffect } from 'react'
import '../Recommend/Recommend.scss'
import ButtonRecommend from '../Content/ButtonRecommend'
import ViewCard from '../Content/ViewCard'
import * as ProductService from '../../../../ProductService'
import { useQuery } from "@tanstack/react-query";
import Header from '../Header'



function SiderBar() {

  const [filterType, setFilterType] = useState(false)

  const [typeProducts, setTypeProducts] = useState([])
  const [productdbs, setProductdbs] = useState([])

  const [limit, setLimit] = useState(50)



  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if (res.status === 'OK')
      setTypeProducts(res?.data)
    return res
  }

  const typeProduct = useQuery({ queryKey: ['type-product'], queryFn: fetchAllTypeProduct })


  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const res = await ProductService.getAllProduct(search, limit)
    return res
  }

  const { isLoading, data: products, isPreviousData } =
    useQuery({
      queryKey: ['products', limit],
      queryFn: fetchProductAll,
      retry: 1,
      retryDelay: 1000,
      keepPreviousData: true
    })
  let prodb = products?.data;
  const [productdb, setProductdb] = useState(prodb)

  // const getData = () => {
  //   fetch('http://localhost:8000/data')
  //     .then(response => response.json())
  //     .then(res => setProductdb(res))
  // }

  // useEffect(() => {
  //   getData()
  // }, [])

  const filterItems2 = (fe) => {
    const newItems2 = products?.data?.filter((newVal) => newVal.description === fe)
    setProductdb(newItems2)
  }


  const data_product = [...new Set(products?.data?.map((val) => val.type))]
  // console.log(data_product)


  const filterItems = (cat) => {
    const newItems = products?.data?.filter((newVal) => newVal.type === cat)
    setProductdb(newItems)
  }

  const changeFilterType = () => {
    setProductdb(products?.data)
  }

  const data_product2 = [...new Set(products?.data?.map((val) => val.description))]

  return (
    <div>
      <section className='sidebar'>
        <h2 className="sidebar-main"></h2>
        <div onClick={() => setFilterType(true)} >
          <Features data_product2={data_product2}
            filterItems2={filterItems2}
            setProductdb={setProductdb}
            products={products?.data}
          ></Features>
        </div>
      </section>
      <div onClick={() => setFilterType(true)}>
        <ButtonRecommend
          changeFilterType={changeFilterType}
          filterItems={filterItems}
          data_product={data_product}
          typeProducts={typeProducts}
        ></ButtonRecommend>
      </div>
      <ViewCard productdb={filterType === false ? products?.data : productdb}></ViewCard>
    </div>
  )
}

export default SiderBar;