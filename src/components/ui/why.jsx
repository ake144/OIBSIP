
const WhyUs = ()=>{
 
    return(
        <div className="flex">
            <div  className="w-1/2 p-7 bg-black"> 
            <img src='/delivery.jpg' className="h-120 w-full"  alt="Pizza-around-world"/>
             </div>
            <div  className="w-1/2 p-7 bg-black">
            
             <h1 className="text-4xl item-center gap-1 font-extrabold text-white"> Why <span className="text-red-500">Nu Pizza?</span></h1>  
              <p className="gap-2 text-white   m-3 p-2 ">  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, minus.<br /> Tempora reprehenderit a corporis velit, laboriosam vitae ullam, repellat illo sequi odio esse iste fugiat dolor, optio incidunt eligendi deleniti!
               </p>
                <strong className="text-white text-xl">Fresh and tasty foods</strong> 
                <p className="gap-2 text-white   m-3 p-2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, voluptatibus.</p>

                   <strong  className="text-white text-md">Quality support</strong>

                <p  className="gap-2 text-white   m-3 p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, earum.</p>

                <strong  className="text-white text-xl"> Order from any location</strong>

                <p  className="gap-2 text-white   m-3 p-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, earum.</p> 
            
            </div>
       </div>
 )

}

export default WhyUs;