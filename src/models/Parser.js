class Parser {
    processData(longText) {
        function hasDuplicateString(array, property) {
            return array.some((item, index, arr) => {
                return arr.findIndex(innerItem => innerItem[property] === item[property]) !== index;
            });
        }
        const processedData = {}
        var dayCounter = -1;
        var destinationCounter = -1;
        longText.forEach(line => {
            if (line.includes('##')) {
                if (line.includes('Day')) {
                    dayCounter++;
                    destinationCounter = -1;
                    if (!processedData.days) {
                        processedData.days = [];
                    }
                    processedData.days.push({day : this.parseDay(line)});
                } else {
                    processedData.title = this.parseTitle(line);
                }
            } else if (line.includes('Average rating')){
                processedData.avgRating = this.parseColon(line);
            } else if (line.includes('Average physical intensity')){
                processedData.avgPhysical = this.parseColon(line);
            } else if (line.includes('Overall description')){
                processedData.overallDescription = this.parseColon(line);
            } else if (line.includes('Activity Recommendation')) {
                processedData.days[dayCounter].destinations[destinationCounter].activity = this.parseComma(line);
            } else if (line.includes('Items')) {
                processedData.days[dayCounter].destinations[destinationCounter].items = this.parseComma(line);
            } else if (line.includes('Destination')){
                destinationCounter++;
                if (!processedData.days[dayCounter].destinations) {
                    processedData.days[dayCounter].destinations = [];
                }
                processedData.days[dayCounter].destinations.push({name : this.parseColon(line)}); 
            } else if (line.includes('Description')){
                processedData.days[dayCounter].destinations[destinationCounter].description = this.parseColon(line);   
            } else if (line.includes('Rating from 1-5')){
                processedData.days[dayCounter].destinations[destinationCounter].rating = this.parseColon(line);
            } else if (line.includes('Budget')){
                processedData.days[dayCounter].destinations[destinationCounter].budget = this.parseColon(line);
            } else if (line.includes('Physical Intensity from 1-5')){
                processedData.days[dayCounter].destinations[destinationCounter].intensity = this.parseColon(line);
            } else if (line.includes('Address')){
                processedData.days[dayCounter].destinations[destinationCounter].address = this.parseColon(line);
            }
        });
        return processedData;
    }

    parseTitle(text) {
        const parts = text.split('##')[1].trim();
        return parts;
    }

    parseDay(text) {
        const parts = text.split('##')[1].trim();
        return parts;
    }

    parseColon(text) {
        const splittedText = text.split(': ').filter((line) => line !== '');
        return splittedText[1];
    }

    parseComma(text){
        const splittedText = this.parseColon(text);
        const split = splittedText.split(', ');
        return split;
    }
}

export default Parser;