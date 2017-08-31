import cheerio from 'cheerio-without-node-native';

function getDirectionUrl(latitude, longitude) {
  return `http://maps.google.com/?q=${latitude},${longitude}`
}

function getRating(status) {
  let ratings = {
    "Good": 3,
    "Hot": 4,
    "Fair": 2,
    "Slow": 1,
    "Closed": 0,
    "No recent report": 0
  }
  // return Array.from(new Array(ratings[status]), (x,i) => i)
  return ratings[status];
}

function findTextAndReturnRemainder(target, variable) {
  let index = target.search(variable);
  if(index == -1) {
    return null;
  }
  let chopFront = target.substring(index + variable.length, target.length);
  let result = chopFront.substring(0, chopFront.search(";"));
  return result;
}

function getWaterBody(text,waterbodies = []) {
  if (!text) {
    return;
  }
  let findAndClean = findTextAndReturnRemainder(text, "var waterbody =")
  if (findAndClean) {
    var result = eval(findAndClean);

    result.forEach((waterbody) => {
      let url = `https://wildlife.utah.gov/hotspots/detailed.php?id=${waterbody[3]}`;
      waterbodies.push({
        title: waterbody[0],
        latitude: waterbody[1],
        longitude: waterbody[2],
        status: waterbody[4],
        rating: getRating(waterbody[4]),
        kind: waterbody[5],
        link: url,
        direction: getDirectionUrl(waterbody[1], waterbody[2])
      });
    })
  }
  return waterbodies;
}

export function extractStocking(html) {
  let $ = cheerio.load(html);
  let items = [];
  $('#fishTable tbody tr').each((index, element) => {
    let item = {};

    $(element).children('td').each((index, child) => {
      let td = $(child);
      let key = td.attr('class');
      item[key] = td.text();
    });

    items.push(item);
  });

  return items;
}

export function extractFishingReport(html) {
  let $ = cheerio.load(html);
  let waterbodies = [];
  $('script').each((index, element) => {
    getWaterBody($(element).html(), waterbodies);
  });
  return waterbodies;
}

export function extractWaterbody(html) {
  let $ = cheerio.load(html);
  let summary = $(".full-article h4 + p").text();
  let details = $(".full-article ul").text();
  let obj = {
    summary: summary,
    details: details
  }
  $(".full-article ul li").each((index, element) => {
    let entry = $(element).text().split(":");
    obj[entry[0].replace(" ", "_")] = entry[1].trim();
  });

  return obj;
}
