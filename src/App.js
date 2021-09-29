import './App.css';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { fetchPrograms, generateTribalOptions } from './utils.js';
import stateOptions from './data/states.json';
import countyData from './data/counties.json';
import Notification from "./Notification.js";
import RentalAssistanceFinder from './RentalAssistanceFinder.js';

function App( props ) {
  const [ data, setData ] = useState( {
    geographic: [],
    tribal: []
  } );
  const [ loading, setLoading ] = useState( true );
  const { t } = useTranslation();

  useEffect( () => {
    // passing empty array as second argument causes this to run once
    const fetchData = () => {
      fetchPrograms()
        .then( programData => {
          setData( programData );
          setLoading( false );
        })
        .catch( error => {
          setLoading( false );
        } );
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      { loading ? (
          <Notification message={ t( 'app.loading' ) }
                        type='loading' />
        ) : (
          <div>
            { data.geographic.length ? 
              (
                <RentalAssistanceFinder countyData={ countyData }
                                        countyThreshold={ props.countyThreshold }
                                        geographic={ data.geographic }
                                        stateOptions={ stateOptions }
                                        tribal={ data.tribal }
                                        tribeOptions={ generateTribalOptions( data.tribal ) }/>
              ) : (
                <Notification message={ t( 'app.unavailable_message' ) }
                              explanation={ t( 'app.unavailable_explanation' ) }
                              type='warning' />
              )
            }
          </div>
        )
      }
    </div>
  );
}

export default App;
