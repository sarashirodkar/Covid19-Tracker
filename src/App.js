import React, { useState, useEffect } from 'react';
import { FormControl,Select, MenuItem, Card, CardContent } from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './util';
import Linegraph from './Linegraph';
import 'leaflet/dist/leaflet.css';


function App() {

  const [countries,setCountries] = useState([]);
  const [countryValue, setCountryValue] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([20,77]);
  const [mapZoom, setMapZoom] = useState(3);
  const [casesType, setCasesType] = useState("cases");
  const [mapCountries, setMapCountries] = useState([]);


  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data =>{setCountryInfo(data)})
  },[]);

  useEffect(()=>{
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
            .then(response => response.json())
            .then(data => { const country = data.map((data) => ({ name:data.country,
                                                                  value:data.countryInfo.iso2 }))
                            setCountries(country);
                            setMapCountries(data);
                            const sortedData = sortData(data);
                            setTableData(sortedData);
                          })
    }
    getCountries();
  },[]);

  const handleCountryCode = async (event) => {
    const countryCode = event.target.value;
    setCountryValue(countryCode); 

    //https://disease.sh/v3/covid-19/countries/[countryCode]
    //https://disease.sh/v3/covid-19/all

    const url = (countryCode === 'worldwide')? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
          .then(response => response.json())
          .then(data => {
            setCountryValue(countryCode);
            setCountryInfo(data);
            setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
            setMapZoom(4)
          })

  }

  return (
    <div className="app">
      <div className="app__left">  
      {/** Header */}
      <div className="app__header">
        <div className="app__heading"><h1>Covid19 Tracker</h1></div>
            <FormControl className="app__dropdown">
              <Select variant="outlined" value={countryValue} onChange={handleCountryCode}>
                 <MenuItem value="worldwide">Worldwide</MenuItem>
                 {countries.map((country,index) =><MenuItem key={index} value={country.value}>{country.name}</MenuItem>)}
              </Select>
            </FormControl>
      </div>
      <div className="app__stats">
        {/** InfoBox */}
        <InfoBox title="Cases" cases={countryInfo.todayCases} total={countryInfo.cases} onClick={(e)=>setCasesType("cases")}
                 active={casesType === "cases"} isCases/>  
        {/** InfoBox */}
        <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} onClick={(e)=>setCasesType("recovered")}
                 active={casesType === "recovered"} isRecovered/>  
        {/** InfoBox */}
        <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} onClick={(e)=>setCasesType("deaths")}
                 active={casesType === "deaths"} isDeaths/>
      </div>
        {/** Map */}
        <Map casesType={casesType} countries={mapCountries}  center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Total Cases by Countries</h3>
        {/** Table */}
        <Table countries={tableData}/>
        {/** Graph */}
        <Linegraph casesType={casesType}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
