import { Grid } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { assesmentsfile } from './dummyfiles/assesmentsfile'
import CardAssesment from './CardAssesment'
import RecommendAssesment from './RecommendAssesment'
import "./userassesment.css"
import CustomButton from '../../../components/Buttons'
import { Link } from 'react-router-dom'
import axios from 'axios';
import callAPI from "../../../utils/callAPI";
import useAPI from "../../../utils/useAPI";

function Assesmentmain() {
  // yo "result" ko value chai "hello" hunxa jaba "setResult()" vitra "hello" xiraye paxi.
    const [result, setResult] = useState(null);

    const message = async() => {
        let response_obj = await callAPI({endpoint:"/targetfield/get_all"});
        setResult(response_obj);
    }

    useEffect(() => {
        message()
    }, [])
    
    if (result != null) {

    // const [data] = useAPI({endpoint:"/targetfield/get_all", fire: false});
    return (
      <div className='assesmentmain-main'>
          <div className='assesmentmain-heading'>
              Assesments
          </div>
          <div className="assesmentmain-subheading">
          List of relatable assesments that might help you in interview prep and submit marks to companies.
          </div>
          <Link to="/ListDoneAssesment">

            <CustomButton name="View My Assesments" addStyles={"reject-button"}>
              
            
            </CustomButton>
            </Link>
        
          <div className='assesment-recommendbox'>
            <RecommendAssesment/>
              
          </div>

          <div className='assesment-available'>
            
          <Grid container direction="row" >
          {result.data.map((val,key)=>{
              return(
                <Grid item className='eachbox' key={key}>
                <CardAssesment name={val.name} type="MCQ" time="20 min" languages={val.languages} difficulty="Easy"/>
                </Grid>            
              
              )
            })}
                </Grid>       

          </div>



        
      </div>
    )
  }
}
export default Assesmentmain
