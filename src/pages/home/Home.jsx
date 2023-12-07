import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Track from '../../components/track/Track'
import Testimonial from '../../components/testimonial/Testimonial'


export default function Home() {
  // const dispatch = useDispatch()
  // const cartItem = useSelector((state)=>state.cart)
// console.log(cartItem)
//   const addCart = ()=>{
//     dispatch(addToCart('shirt'))
//   }
//   const deleteCart = () =>{
//     dispatch(deleteFromCart('shirt'))
//   }
//   const context = useContext(myContext)
//   console.log(context)
  return (
    <Layout>
        <HeroSection/>
        <Filter/>
        <ProductCard/>
        <Track/>
        <Testimonial/>
    </Layout>
  )
}
