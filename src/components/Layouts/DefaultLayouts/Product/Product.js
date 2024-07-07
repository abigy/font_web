import ViewCard from '../Content/ViewCard';
import './Product.scss';

// function Product({ result }) {
//   return (
//     <div>
//       <section className="card-container">{result}</section>
//     </div>
//   )
// }

function Product() {
  return (
    <div>
      <section className="cardContainer"><ViewCard></ViewCard></section>
    </div>
  )
}

export default Product;