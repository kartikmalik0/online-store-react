import { useEffect, useState } from 'react'
import myContext from './myContext'
import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc } from "firebase/firestore"
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

  const [order, setOrder] = useState([]);
  const getOrderData = async () => {
    setLoading(true);
    const ordersArray = [];
    try {
        const result = await getDocs(collection(fireDB, "order"));
        result.forEach((doc) => {
            ordersArray.push(doc.data());
          });
          console.log(order)
        } catch (error) {
          console.log(error);
        } finally {
        setOrder(ordersArray);
        setLoading(false);
    }
};




  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true)
    try {
        const result = await getDocs(collection(fireDB, "users"))
        const usersArray = [];
        result.forEach((doc) => {
            usersArray.push(doc.data());
            setLoading(false)
        });
        setUser(usersArray);
        setLoading(false);
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}
  useEffect(() => {
    getOrderData();
    getUserData();
}, []);


const [searchkey, setSearchkey] = useState('')
const [filterType, setFilterType] = useState('')
const [filterPrice, setFilterPrice] = useState('')







const addCartFirebase = async (cart) => {
  const userString = localStorage.getItem('user');
  const userObject = JSON.parse(userString);
  const id = userObject?.user?.uid;

  const cartRef = doc(fireDB, 'userCart', id);

  const finalCart = { userId: id, ...cart };


  setLoading(true);
  try {
    // Retrieve the current data
    const cartDoc = await getDoc(cartRef);
    const currentCartArray = cartDoc.exists() ? cartDoc.data().cartItems || [] : [];

    // Append the new cart item
    const updatedCartArray = [...currentCartArray, finalCart];

    // Set the updated array back to Firestore
    await setDoc(cartRef, { cartItems: updatedCartArray });
    getCartItems()
    toast.success("Add to Cart");
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};






const [userCart, setUserCart] = useState('')
const getCartItems = async () => {
  const userString = localStorage.getItem('user');
  const userObject = JSON.parse(userString);
  const userId = userObject?.user?.uid;

  if (!userId) {
    console.error('User ID not available.');
    return [];
  }

  const cartRef = doc(fireDB, 'userCart', userId);

  try {
    const cartDoc = await getDoc(cartRef);
    if (cartDoc.exists()) {
      const cartItems = cartDoc.data().cartItems || [];
      setUserCart(cartItems)
      return cartItems;
    } else {
      console.log('Cart document does not exist.');
      return [];
    }
  } catch (error) {
    console.error('Error retrieving cart items:', error);
    return [];
  }
};







//delete cart



const deleteCartItem = async (productId) => {
  const userString = localStorage.getItem('user');
  const userObject = JSON.parse(userString);
  const userId = userObject?.user?.uid;

  if (!userId) {
    console.error('User ID not available.');
    return;
  }

  const cartRef = doc(fireDB, 'userCart', userId);

  try {
    const cartDoc = await getDoc(cartRef);

    if (cartDoc.exists()) {
      const currentCartArray = cartDoc.data().cartItems || [];

      // Find the index of the cart item with the specified product ID
      const indexToDelete = currentCartArray.findIndex(item => item.id === productId);

      if (indexToDelete !== -1) {
        // Use the delete operator to remove the item from the array
        delete currentCartArray[indexToDelete];

        // Update the cart items in Firestore
        await setDoc(cartRef, { cartItems: currentCartArray.filter(Boolean) });
        toast.success('Item Removed')
        getCartItems()
      } 
    } 
  } catch (error) {
    console.error('Error deleting cart item:', error);
  }
};








  return (
    <myContext.Provider value={{ mode, toggleMode, loading, setLoading , products , setProducts ,searchkey, setSearchkey,filterType,setFilterType,
      filterPrice,setFilterPrice, addProduct , product , edithandle,order, updateProduct, deleteProduct ,getOrderData, user,addCartFirebase , userCart,getCartItems,setUserCart}}>
      {props.children}
    </myContext.Provider>
  )
}
