
import { useState } from 'react';
import {useQuery} from 'react-query';  
import './App.css';


function App() {

const [lightDark, setLightDark] = useState(true)
const [showModal, setShowModal] = useState(true)
const { isLoading, refetch, data, error} = useQuery ('quoteData', fetchQuote)


      

    async function fetchQuote (){
      const res =  await fetch('https://api.quotable.io/random'); 
      if(!res.ok){ 
        throw error ('Failed to get quote')
      }
      return res.json();

    }

    const getNewQuote = (e) =>{ 
      e.preventDefault()

      refetch()

    }
    
    const toggleDark = () =>{ 
        setLightDark (!lightDark)
    }


    // const toggleModal = () =>{ 
    //   setShowModal(!showModal)
    // }

    const handleWhatsappShare = () =>{
        const url ='https://quotegenvv.vercel.app/'
      if(navigator.share){
          navigator.share({ 
            title:data.title, 
            text:`${data.content} read more quotes`,
            url: url
          
          })
          .then(() => alert('contentshared successfull'))
          .catch((error) => console.error('error sharing content', error))
        }

    }


    if(!lightDark){ 
      document.body.classList.add('body-dark');
    }
    else{ 
      document.body.classList.remove('body-dark');
    }

      if(isLoading){ 
        return <div className='loading'>
            <p>Loading...</p>
        </div>
        
      }
      if(error){
        return <div>Error: {error.message}</div>
      }


return (
  <>
  
  <div className='container'>
    <div className='light-dark'> 
      
      {lightDark ? <ion-icon name="sunny-outline" className="light-icon" onClick={toggleDark}></ion-icon> :  <ion-icon name="contrast-outline" onClick={toggleDark} ></ion-icon> }
    </div>
      <div className='quote-wrap'> 
        <div className='share-btn'>
              <ion-icon name="share-outline" onClick={handleWhatsappShare} ></ion-icon>
            
        </div>
          <h4 className={lightDark ? 'quote-heading': 'quote-heading dark-txt'}>click to see random inspiration/love quote</h4>
        <div className='quote-author--center'> 
          <p className={lightDark ? 'quote-word' : 'quote-word dark-txt'}> {data.content} </p>
          <small className={lightDark ? 'quote-author' : 'quote-author author-txt'}>
              -{data.author}
          </small>
        </div>
        <button className={lightDark ? 'btn' : 'btn dark-btn'} onClick={getNewQuote}>New Quote</button>
      

      <small className='footer'> 
          <a href='https://www.github.com/cjwalt' className={lightDark ? undefined : 'dark-txt' }>cjwalt</a>
      </small>
      </div>

</div>



  </>
     
  );

}

export default App;
