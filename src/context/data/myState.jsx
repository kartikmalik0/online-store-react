import { useEffect, useState } from 'react'
import myContext from './myContext'
import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore"
import { toast } from 'react-toastify'
import { fireDB } from '../../firebase/FirebaseConfig'
export default function myState(props) {
  const [mode, setMode] = useState('light')
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark')
      document.body.style.background = 'rgb(17,24,39)'
    }
    else {
      setMode('light')
      document.body.style.background = 'white'
    }
  }

  const [loading, setLoading] = useState(false)

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric"
      }
    )
  });

  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error("all fields are required")
    }
    setLoading(true)

    try {
        const productRef = collection(fireDB, 'products');
        await addDoc(productRef, products)
        toast.success("Add product successfully");
        setTimeout(() => {
            window.location.href = '/dashboard'
        }, 800);
        // getProductData();
        setLoading(false)
    } catch (error) {
        console.log(error);
        setLoading(false)
    }
  }


  

  const [product, setProduct] = useState([]);

  const getProductData = async () => {

      setLoading(true)

      try {
          const q = query(
              collection(fireDB, 'products'),
              orderBy('time')
          );

          const data = onSnapshot(q, (QuerySnapshot) => {
              let productArray = [];
              QuerySnapshot.forEach((doc) => {
                  productArray.push({ ...doc.data(), id: doc.id });
              });
              setProduct(productArray);
              setLoading(false)
          });

          return () => data;

      } catch (error) {
          console.log(error)
          setLoading(false)
      }

  }

  useEffect(() => {
      getProductData();
  }, []);
    // update product function
    
    const edithandle = (item) => {
      setProducts(item)
  }

  const updateProduct = async () => {
      setLoading(true)
      try {

          await setDoc(doc(fireDB, 'products', products.id), products)

          toast.success("Product Updated successfully")
          setTimeout(() => {
              window.location.href = '/dashboard'
          }, 800);
          getProductData();
          setLoading(false)

      } catch (error) {
          console.log(error)
          setLoading(false)
      }
  }

  // delete product

  const deleteProduct = async (item) => {
      setLoading(true)
      try {
          await deleteDoc(doc(fireDB, 'products', item.id))
          toast.success('Product Deleted successfully')
          getProductData();
          setLoading(false)
      } catch (error) {
          console.log(error)
          setLoading(false)
      }
  }


  return (
    <myContext.Provider value={{ mode, toggleMode, loading, setLoading , products , setProducts , addProduct , product , edithandle, updateProduct, deleteProduct}}>
      {props.children}
    </myContext.Provider>
  )
}