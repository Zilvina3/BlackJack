import './LoadingSpin.css'

const LoadingSpin = ({loadingClass}) => {
    return(
        <div className={loadingClass}>
           <div className="donut"></div> 
        </div>      
    )
}

export default LoadingSpin;