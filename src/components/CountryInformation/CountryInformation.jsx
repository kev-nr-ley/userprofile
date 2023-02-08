import React from "react";
import { useState, useEffect, useRef } from "react";
import LanguageContainer from "./LanguageContainer/LanguageContainer";
import CountrySelection from "./CountrySelection/CountrySelection";
import "./CountryInformation.scss";
/*
Takes in the countryCode prop and renders the infortmation from the fetch responses
*/
export default function CountryInformation(props) {
  const countryCode = props.countryCode;
  const setCountryCode = props.setCountryCode;

  const countryData = props.countryData;
  const setCountryData = props.setCountryData;

  const [countryCCA2, setCountryCCA2] = useState("");

  //set states

  const [countryLanguages, setCountryLanguages] = useState([]);
  const [countryNameOffical, setCountryNameOffical] = useState("");
  const [countryNameCommon, setCountryNameCommon] = useState("");
  const [countryCapital, setCountryCapital] = useState("");
  const [countryPopulation, setCountryPopulation] = useState("");
  const [countryRegion, setCountryRegion] = useState("");
  const [countrySubregion, setCountrySubregion] = useState("");
  const [countryFlagIcon, setCountryFlagIcon] = useState("");
  const [countryFlagSVG, setCountryFlagSVG] = useState("");
  const [countryFlagAlt, setCountryFlagAlt] = useState("");
  const [countryCoatOfArms, setCountryCoatOfArms] = useState("");

  const restCountriesURL = "https://restcountries.com/v3.1/";

  //convert object to array
  function objectEntriesToArray(object) {
    if (object) {
      const array = [];
      for (const [key, value] of Object.entries(object)) {
        array.push(value);
        // console.log(`${key}: ${value}`);
      }
      // console.log(array);
      return array;
    }
    return null;
  }

  console.log(countryData);

  const consoleLogCountryData = () => {
    if (countryData) {
      console.log(`
   ___________________Country Data____________________
   |Input Code:  ${countryCode}
   |ResponseCode:${countryData.cca2}
   |Official:    ${countryData.name.official}
   |Common:      ${countryData.name.common}
   |Capital:     ${countryData.capital}
   |Population:  ${countryData.population}
   |Region:      ${countryData.region}
   |Subregion:   ${countryData.subregion}
   |Languages:   ${objectEntriesToArray(countryData.languages)}
   |CoatOfArms:  ${countryData.coatOfArms.svg}
   |Flag:        ${countryData.flag}
   |FlagSrc:     ${countryData.flags.svg}
   |FlagAlt:     ${countryData.flags.alt}
   _________________________________________________
    `);
    }
  };

  const setCountryStates = () => {
    if (countryData) {
      setCountryLanguages(objectEntriesToArray(countryData.languages));
      setCountryNameOffical(countryData.name.official);
      setCountryNameCommon(countryData.name.common);
      setCountryCapital(countryData.capital);
      setCountryPopulation(countryData.population);
      setCountryRegion(countryData.region);
      setCountrySubregion(countryData.subregion);
      setCountryFlagIcon(countryData.flag);
      setCountryFlagSVG(countryData.flags.svg);
      setCountryFlagAlt(countryData.flags.alt);
      setCountryCoatOfArms(countryData.coatOfArms.svg);
    }
  };

  const saveCountryDataToLocalStorage = () => {
    window.localStorage.setItem("countryData", JSON.stringify(countryData));
  };

  const fetchCountryDataFromCode = async () => {
    const code = countryCode;
    const response = await fetch(restCountriesURL + "name/" + code);
    const data = await response.json();
    const country = JSON.parse(JSON.stringify(data[0]));
    setCountryData(country);
    saveCountryDataToLocalStorage();
    return country;
  };

  useEffect(() => {
    if (countryCode) {
      fetchCountryDataFromCode();
    }
  }, [countryCode]);

  useEffect(() => {
    if (countryData) {
      setCountryStates();
      saveCountryDataToLocalStorage();
    }
  }, [countryData]);

  useEffect(() => {
    consoleLogCountryData();
  }, [countryData]);

  return (
    <div className='country-info'>
      <CountrySelection
        setCountryCode={setCountryCode}
        fetchCountryDataFromCode={fetchCountryDataFromCode}
        setCountryStates={setCountryStates}
      />
      <h2>Country Information</h2>
      <div className='country-info__container'>
        <div
          className='country-info__container__flag'
          style={{ display: "flex" }}>
          {/* <h3>Flag</h3> */}
          <img
            src={countryFlagSVG}
            alt={
              countryFlagAlt
                ? countryFlagIcon + countryFlagAlt
                : countryNameCommon + countryFlagIcon
            }
            style={{ maxHeight: 330 }}
          />
          <div className='country-info__container__info__coat-of-arms'>
            {/* <h3>Coat of Arms</h3> */}
            {countryCoatOfArms ? (
              <img
                src={countryCoatOfArms}
                alt=''
                style={{ height: 320, maxHeight: 320 }}></img>
            ) : (
              <p>Coat of Arms not available</p>
            )}
          </div>
        </div>

        <div className='country-info__container__info'>
          <div className='country-info__container__info__name'>
            <h3>{countryNameOffical}</h3>
            <h4>{countryNameCommon}</h4>
          </div>
        </div>

        <div className='country-info__container__info__languages'>
          <h3>Languages</h3>
          {countryLanguages
            ? countryLanguages.map((language, index) => {
                return <LanguageContainer key={index} language={language} countryName={countryNameCommon} countryFlag={countryFlagSVG} />;
              })
            : null}
        </div>

        <div className='country-info__container__info__capital'>
          <h3>Capital</h3>
          <p>{countryCapital}</p>
          <h4>Region & Sub-Region</h4>
          <p>
            {" "}
            {countryRegion} & {countrySubregion}
          </p>
        </div>

        <div className='country-info__container__info__population'>
          <h3>Population</h3>
          <p>{countryPopulation}</p>
        </div>
      </div>
    </div>
  );
}
