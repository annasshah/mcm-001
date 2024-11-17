import * as countriesData from "./countries.json";

interface Country {
  name: string;
  code: string;
}

function getCountryName(countryCode: string): string {
  const countries: Country[] = countriesData;
  const upperCaseCode = countryCode.toUpperCase();

  const foundCountry = countries.find(
    (country) => country.code === upperCaseCode
  );
  return foundCountry ? foundCountry.name : "Country code not found";
}

export { getCountryName };
