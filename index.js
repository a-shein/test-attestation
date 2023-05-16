import _ from 'lodash'

export default function solution(content){
  // BEGIN
    let data = content.split('\n').slice(1)
    data.pop()

    const cities = data.map((item) => item.split(',')[7]);
    const sortedCities = _.uniq(cities).sort();

    const humidity = data.map((item) => item.split(',')[3])

    const hottestDay = data.reduce((acc, item) => acc.split(',')[1] > item.split(',')[1] ? acc : item)

    const hottestCity = data.reduce((acc, item) => {
            if (!acc.hasOwnProperty(item.split(',')[7])) {
                acc[item.split(',')[7]] = [item];
            } else {
                acc[item.split(',')[7]].push(item);
            }

        return acc;
    }, []);

    let tempResult = [];
    for (const city in hottestCity) {
        tempResult[city] = 0;
        let dayCounter = 0;
        for (const row of hottestCity[city]) {
            let arrayRow = row.split(',')
            tempResult[city] += (Number(arrayRow[1]) + Number(arrayRow[2])) / 2;
            dayCounter ++;
        }
        tempResult[city] = tempResult[city] / dayCounter
    }

    let result = null
    let maxTemp = 0;
    for (const city in tempResult) {
        if (tempResult[city] > maxTemp) {
            maxTemp = tempResult[city]
            result = [city, tempResult[city]]
        }
    }

    console.log(`Count: ${data.length}`);
    console.log(`Cities: ${sortedCities.join(', ')}`);
    console.log(`Humidity: Min: ${_.min(humidity)}, Max: ${_.max(humidity)}`);
    console.log(`HottestDay: ${hottestDay.split(',')[0]} ${hottestDay.split(',')[7]}`)
    console.log(`HottestCity: ${result[0]}`)
  // END

}
