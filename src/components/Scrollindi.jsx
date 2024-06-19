import { useEffect } from "react";
import { useState } from "react";

const  Scrollindi = ()=>{
    const [data , setData] = useState([]);
    const [scrollWidth, setScrollWidth] = useState(0);

    const updateScrollWidth = () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        setScrollWidth(scrolled);
      };

      useEffect(() => {
        window.addEventListener('scroll', updateScrollWidth);
        return () => window.removeEventListener('scroll', updateScrollWidth);
      }, []);


    const fetchProduct = async () => {
        try {
            
          const response = await fetch(
            'https://dummyjson.com/products/?limit=100' );
          const result = (await response.json())?.products;
          setData(result);
    
        } catch (e) {
          console.log(e);
        }
      }
    
    useEffect(()=>{
        fetchProduct();
    },[])
    // console.log(data[0].title)


  return (
    <div className="main-container">
      <div className="scroll-status">
        <h3>Custom Scroll Indicator</h3>
            <div className="scroll-success" >
                <div className="scroll-track" style={{width :`${scrollWidth}%`}}></div>
            </div>
      </div>
        <div className="product-list">
            {
                data && data.length > 0 ? data.map((item,indx)=>(
                    <p key={indx} >{item.title}</p>
                )) : null
            }
        </div>
    </div>
  )
}

export default Scrollindi;
