
import {useQuery} from 'react-query';  
import './App.css';


function App() {

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

      if(isLoading){ 
        return <div className='loading'>
            <p>Loading</p>
        </div>
        
      }
      if(error){
        return <div>Error: {error.message}</div>
      }


return (
  <>
  
  <div className='container'>

      <div className='quote-wrap'> 
          <h4 className='quote-heading'>click to see random inspiration/love quote</h4>
        <div className='quote-author--center'> 
          <p className='quote-word'> {data.content} </p>
          <small className='quote-author'>
              -{data.author}
          </small>
        </div>
        <button className='btn' onClick={getNewQuote}>New Quote</button>
      

      <small className='footer'> 
          <a href='https://www.github.com/cjwalt'>cjwalt</a>
      </small>
      </div>

</div>



  </>
     
  );

}

export default App;
