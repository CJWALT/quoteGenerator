
import {useQuery} from 'react-query';  
import './App.css';


function App() {

const { isLoading, refetch, data, error} = useQuery ('quoteData', fetchQuote)


    console.log(data)
      

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

      if(isLoading){ 
        return  <div>
          Loading
        </div>
      }
      if(error){
        return <div>Error: {error.message}</div>
      }


return (
  <>
  
  <div className='container'>

      <div className='quote-wrap'> 
        <div className='quote-author--center'> 
          <p className='quote-word'> {data.content} </p>
          <small className='quote-author'>
              {data.author}
          </small>
        </div>
        <button className='btn' onClick={getNewQuote}>New Quote</button>
      </div>

      <small className='footer'> 
          <a href='github.com/cjwalt'>cjwalt</a>
      </small>

</div>



  </>
     
  );

}

export default App;
