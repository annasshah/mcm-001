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



function formatPhoneNumber(phoneNumberString: string) {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const intlCode = (match[1] ? '+1 ' : '');
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return phoneNumberString; // Return the original number if formatting fails
}

export { getCountryName, formatPhoneNumber };


