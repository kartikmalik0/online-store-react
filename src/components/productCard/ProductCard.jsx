import { useContext, useEffect } from 'react'
import myContext from '../../context/data/myContext'
import { useSelector } from 'react-redux'
import Loader from '../../components/loader/Loader';

function ProductCard() {
  const context = useContext(myContext)
  const { mode, product, searchkey, filterType,
    filterPrice, addCartFirebase } = context
  const cartItems = useSelector((state) => state.cart)
  const addCart = (product) => {
    addCartFirebase(product)
  }
  // console.log(product)


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems])



  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Our Latest Collection</h1>
          <div className="h-1 w-20 bg-pink-600 rounded"></div>
        </div>

       {
        product ?  <div className="flex flex-wrap -m-4 justify-center " >
        {product.filter((obj) => obj.title.toLowerCase().includes(searchkey))
          .filter((obj) => obj.category.toLowerCase().includes(filterType))
          .filter((obj) => obj.price.includes(filterPrice)).slice(0, 8).map((item, index) => {
            const { title, price, imageUrl, id } = item;
            return (
              <div key={index} className="relative m-10 w-full snap-start max-w-xs overflow-hidden rounded-lg bg-white shadow-md">
                <a onClick={() => window.location.href = `/productinfo/${id}`} className='cursor-pointer block w-full h-60'>
                  <img className="w-full h-full object-contain rounded-t-lg" src={imageUrl} alt="product image" />
                </a>
                <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">Sale</span>
                <div className="mt-4 px-5 pb-5" style={{ background: mode === 'dark' ? '' : '' }}>
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight line-clamp-2" style={{ color: mode === 'dark' ? 'white' : '', }}>{title}</h5>
                  </a>
                  <div className="mt-2.5 mb-5 flex items-center">
                    <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
                    {/* Add SVG icons here */}
                    {/* For brevity, I'm omitting the SVG elements */}
                  </div>
                  <div className="flex items-center justify-between">
                    <p>
                      <span className="text-3xl font-bold " style={{ color: mode === 'dark' ? 'white' : '' }}>₹{price}</span>
                      {/* <span className="text-sm text-slate-900 line-through">$299</span> */}
                    </p>
                    <a className="flex items-center rounded-md bg-pink-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-pink-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
                      onClick={() => addCart(item)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2  h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
      </div> : <h1>Loading...</h1>
       }
      </div>
    </section >


  )
}

export default ProductCard