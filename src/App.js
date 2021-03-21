import React, { useState, useEffect } from 'react';
import { FormControl,Select, MenuItem } from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox';

function App() {

  const [countries,setCountries] = useState([]);
  const [countryValue, setCountryValue] = useState("Worldwide");

  useEffect(()=>{
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
            .then(response => response.json())
            .then(data => { const country = data.map((data) => ({ name:data.country,
                                                                  value:data.countryInfo.iso2 }))
                            setCountries(country)
                          })
    }
    getCountries();
  },[]);

  const handleCountryCode = (event) => {
    const countryCode = event.target.value;
    setCountryValue(countryCode);
  }

  return (
    <div className="app">
      {/** Header */}
      <div className="app__header">
        <div className="app__heading"><h1>Covid19 Tracker</h1></div>
            <FormControl className="app__dropdown">
              <Select variant="outlined" value={countryValue} onChange={handleCountryCode}>
                 <MenuItem value="Worldwide">Worldwide</MenuItem>
                 {countries.map((country,index) =><MenuItem key={index} value={country.value}>{country.name}</MenuItem>)}
              </Select>
            </FormControl>
      </div>
      <div className="app__stats">
        {/** InfoBox */}
        <InfoBox title="CoronaVirusCases" cases={1223} total={100}/>  
        {/** InfoBox */}
        <InfoBox title="Recovered" cases={123} total={200}/>  
        {/** InfoBox */}
        <InfoBox title="Deaths" cases={1234} total={300}/>
      </div>
    </div>
  );
}

export default App;
