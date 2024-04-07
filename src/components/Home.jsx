import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPizzaAsync, selectGetItems, selectGetItemsStatus, selectGetError } from './product/productSlice';
import { addToCartAsync, selectCartItemAddStatus } from './cart/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './ui/footer';
import WhyUs from './ui/why';

function Home({user}) {
    const dispatch = useDispatch();
    const items = useSelector(selectGetItems);
    const status = useSelector(selectCartItemAddStatus);
    const error = useSelector(selectGetError);
    
    const userId = user ? user._id : null;

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

    const handleAddToCart = (product) => {
        dispatch(addToCartAsync({ userId: userId, productId: product._id}));
        
        if (!user) {
            showToastForCaseThree();
        } else if (status === "fulfilled") {
            showToast();
        } else if (status === "rejected") {
            showToastForCaseOne();
        }
    };
    


    return (
        <>
            <ToastContainer />
            <div className="bg-cover bg-center min-h-screen py-9 " style={{ backgroundImage: `url('/pizza1.jpg')` }}>
                <div className="flex flex-col pt-12 items-center justify-center">
                    <h1 className="text-2xl gap-5 p-3 text-white">
                        We Have{' '}
                        <span className="text-gray-900 font-extrabold">The BEST PIZZA</span>
                    </h1>
                    <p className="font-mono p-3 text-black font-extrabold">Time to Enjoy our delicious Pizza</p>
                    <button className="bg-black text-white p-3 m-3 border-2">
                        Order Now
                    </button>
                </div>
            </div>
            <div  id='products' className="min-h-screen bg-black my-0 flex flex-col justify-center items-center py-0 sm:py-1 px-6 sm:px-8">
                <h2 className="text-3xl font-bold text-center mb-6 my-5 p-5 text-white">Trending Recipes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-24">
                    {items.map((pizza, index) => (
                        <div key={index} className="bg-orange-100 rounded-xl shadow-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-500 ease-in-out">
                            <img
                                src={pizza.imageUrl}
                                className="w-full h-36 object-cover"
                                alt={pizza.name}
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-black mb-1">
                                    {pizza.name}
                                </h3>
                                <p className="text-sm text-gray-700 mb-2">{pizza.description}</p>
                                <div className="flex justify-between items-center w-full">
                                    <span className="text-xl font-bold text-orange-500">
                                        ${pizza.price}
                                    </span>
                                    <div className="flex">
                                        <div className='w-1/2 text-gray-700'>
                                            <p>Size: {pizza.size}</p>
                                        </div>
                                        <div className="w-1/2">
                                        <button onClick={() => handleAddToCart(pizza)} className="bg-black font-serif text-sm text-white py-2 px-4 border border-black rounded-md hover:bg-gray-500 transition-colors duration-300">
                                            ADD TO CART
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
                    <div>
                            <WhyUs />
                    </div>
            <Footer />
        </>
    );
}

export default Home;
