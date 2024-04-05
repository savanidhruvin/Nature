import React,{useEffect,useState} from 'react'
import Api from './ApiData'
import Spinner from './Spinner'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Nature = (props) => {

const [data, setData] = useState([])  
const [loading, setLoading] = useState(true)


useEffect(()=>{
  setTimeout(()=>{
  //  props.setProgress(30)
    setData(Api)
    // props.setProgress(50)
    setLoading(false)
    // props.setProgress(100)
  },3000)
},[])

document.title = `Nature`

  return (
    <div>
    <div className='text-center mt-5'>
     <h1 className="pt-5">Nature - Information</h1>
   </div>
 {/* {loading && <Spinner/>} */}
 <div className='container'>
    <div className='row'>

    {
      loading ? (
   
        Array.from({ length: 9 }).map((_, index) => 
        <div className='col-md-4 mt-4' key={index}>
            <div className='card border-0'>
              <Skeleton width="100%" height={180} style={{backgroundColor:'#4F6F52'}} />
              <div className='card-body p-0 mt-2'>
              <Skeleton width="100%" height={40} style={{backgroundColor:'#D4E7C5'}}  />
               <div className='mt-2'>
               <Skeleton width="100%" height={50}  style={{backgroundColor:'#D4E7C5'}}/>
               </div>
               <div className='mt-2'>
               <Skeleton width="30%" height={50}  style={{backgroundColor:'#99BC85'}}/>
               </div>
              </div>
            </div>
          </div>
        )
      ) : (
        data.map((element)=>{
          if(element.category === 'Nature'){
             
               return <div className='col-md-4 mt-4' key={element.id}>
                  <div className="card" >
                       <img src={element.url} className="card-img-top" alt="..." style={{height:'200px'}} />
                  <div className="card-body">
                       <h5 className="card-title">{element.title}</h5>
                       <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                       <a href={element.thumbnailUrl} target='_blank'  rel="noreferrer" className="btn btn-primary">Go to website</a>
                  </div>
                  </div>
                </div> 
          }    
         })
      )
    }

     
      
     


     
     </div>
   </div>
</div>
  )
}

export default Nature
