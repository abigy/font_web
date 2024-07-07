import { useState, useEffect } from "react";
import ViewDetails from "../Product/ViewDetails/ViewDetails";
import toggleModal from "../Product/ViewDetails/ViewDetails"
import { IoCloseCircle } from "react-icons/io5";
import * as ProductService from '../../../../ProductService'
import { useQuery } from "@tanstack/react-query";
import './ViewCard.scss'

function ViewCard({ productdb }) {
  const [modal, setModal] = useState(false)
  const [limit, setLimit] = useState(50)


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
      retry: 3,
      retryDelay: 1000,
      keepPreviousData: true
    })


  const [detail, setDetail] = useState({
    id: '',
    image: '',
    name: '',
    price: '',
    selled: '',
    description: '',
  })

  const toggleModal_getData = (products) => {
    setModal(!modal)
    console.log("Id: ", products)
  }

  const toggleModal = () => {
    setModal(!modal)
    setDetail({
      id: '',
      image: '',
      name: '',
      price: '',
      discount: '',
      description: '',
    })
  }

  const handleGetDetails = (id) => {
    const pro = productdb.filter(product => id === product._id)
    setModal(!modal)
    console.log('Pro: ', pro)
    setDetail(pro)
  }


  // const getData = () => {
  //   fetch('http://localhost:8000/data')
  //     .then(response => response.json())
  //     .then(res => setProductdb(res))
  // }


  // useEffect(() => {
  //   getData()
  // }, [])

  return (
    <div className="cardContainer">
      {modal && (
        <div className="model_Container">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="details-container">
            <button onClick={toggleModal} className='close-icon'> <IoCloseCircle /></button>
            <div className="detail-content ">
              <div>
                <div className="details-info">
                  <div className="img_box">
                    <img className='img-details' src={detail[0].image} alt="Hình nhạy cảm" />
                  </div>
                  <div className="product-details">
                    <h2 className="detail-title">{detail[0].name}</h2>
                    <span className="container-price flex">
                      <h3 className="detail-price red">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detail[0].price)}</h3>
                      <del className="detail-price price-sale mar_20px">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detail[0].discount)}</del>
                    </span>
                    <div className="detail-des">{detail[0].description}</div>
                    <button className="add-cart" >Thêm vào giỏ hàng</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* card-product */}
      {productdb?.map((name, index) =>
        <section key={index} className="card">
          <img className='card-img'
            src={name.image}
            alt={name.name} />
          <div className="card-details">
            <h3 className="card-title">{name.name}</h3>
            <div className="card-price">
              <div className="main-price">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(name.price)}</div>
              <span className="card-sale">
                <del className="price">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(name.discount)}</del>
              </span>
            </div>
            <div className="card-description">
              <span className="promotion">{name.description}</span>
            </div>
          </div>
          <div className="Cart">
            <button onClick={() => handleGetDetails(name._id)} className="cart-btn button">
              Xem chi tiết
            </button>
          </div>
        </section>
      )}
      {/* end-card-product */}
    </div>
  )
}

export default ViewCard;