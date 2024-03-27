import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPizzaAsync, selectGetItems, selectGetItemsStatus, selectGetError } from './product/productSlice';
import { addToCartAsync,selectCartItemAddStatus } from './cart/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './ui/footer';

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(selectGetItems);
    const status = useSelector(selectCartItemAddStatus);
    const error = useSelector(selectGetError);
    // const [selectedPizzaIndex, setSelectedPizzaIndex] = useState(null);
    const userId = localStorage.getItem('userID');

    useEffect(() => {
        dispatch(fetchAllPizzaAsync());
    }, [dispatch]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    const showToastForCaseOne = () => {
        toast.error('Item already in cart');
    };

    const showToastForCaseThree = () => {
        toast.error('You need to sign in first!');
    };

    const showToast = () => {
        toast.success('Item added to cart');
    };

    const handleAddToCart = (pizza) => {
      dispatch(addToCartAsync({ userId: userId, item: pizza }));
      console.log(status)
      if(status === "fulfilled"){
        showToast()
      }
      else if(status === "rejected"){
         showToastForCaseOne()
      }
      else{
        showToastForCaseThree()
      }
  };
    return (
        <>
            <ToastContainer />
            <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url('/pizza1.jpg')` }}>
                <div className="flex flex-col pt-12 items-center justify-center">
                    <h1 className="text-2xl gap-5 p-3 text-white">
                        We Have{' '}
                        <span className="text-white font-bold">The BEST PIZZA</span>
                    </h1>
                    <p className="font-mono p-3 text-white">Time to Enjoy our delicious Pizza</p>
                    <button className="bg-black text-white p-3 m-3 border-2">
                        Order Now
                    </button>
                </div>
            </div>

            <h2 className='text-3xl justify-center items-center'>Trending Recipes</h2>
            <div id='products' className='flex flex-wrap justify-center items-center gap-10'>
                {items.map((pizza, index) => (
                    <div key={index} className="shadow-lg p-3 mb-5 bg-white rounded-lg mx-3 my-3 w-1/3">
                        <h1 className="text-1xl font-bold p-5 m-5">{pizza.name}</h1>
                        <img
                            src={pizza.imageUrl}
                            className="h-25 w-1/2 img-fluid"
                            alt={pizza.name}
                        />
                        <div className="flex flex-col">
                            <div className="w-100 m-1">
                                <div className='w-1/2'>
                                    <p>Sizes:  {pizza.size} </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="w-100 m-1">
                                <h1 className='mt-1 '>Price: {pizza.price}</h1>
                            </div>
                            <div className="w-100 m-1">
                                <button onClick={() => handleAddToCart(pizza)} className="bg-black text-white p-3 m-3 border-2">
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        <div className='flex '>
            <div id='about' className="  items-center justify-center p-10 m-10">
        <h1 className="text-3xl font-bold p-5 m-5">About Us</h1>
        <p>Lorem ipsum dolor sit amr,</p>
        <p>ispumln the iolrst oprmum sor dol yisnnsk</p>
        <p>Lorem ipsum dolor sit amr,</p>
        <p>ispumln the iolrst oprmum sor dol yisnnsk</p>
      </div>
      <div id='contact' className="flex flex-col items-center justify-center p-5 m-3">
        <h1 className="text-3xl font-bold p-5 m-5">CONTACT US</h1>
        <p>+46 738 123 234</p>
      </div>
      </div>
            <Footer />
        </>
    );
}

export default Home;
