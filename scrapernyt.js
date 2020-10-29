//scrapernyt.js

const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://govstatus.egov.com/OR-OHA-COVID-19";

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    let covid = [];
    let county = [];
    //Statewide total covid cases and deaths
    $("tbody>tr").each(function (i, elem) {
      if (i < 2) {
        covid.push({
          covidstat_description: $(elem).find("tr>td").eq(0).text(),
          data: $(elem).find("tr>td").eq(1).text(),
        });
      }
    });
    //Countywise covid cases and deaths
    $("#collapseDemographics > div > table:nth-child(1) > tbody>tr").each(
      function (i, elem) {
        if (i >= 0) {
          county.push({
            county_name: $(elem).find("tr>td").eq(0).text(),
            cases: $(elem).find("tr>td").eq(1).text(),
            deaths: $(elem).find("tr>td").eq(2).text(),
          });
        }
      }
    );
    console.log("Statewide covid cases and deaths for Oregon:");
    console.log(covid);
    console.log("Countywise covid cases and deaths for Oregon:");
    console.log(county);
  })
  .catch(console.error);
