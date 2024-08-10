class Parser {
    processData(longText) {
        const processedData = {}
        var i = -1;
        longText.forEach(line => {
            if (line.includes('##')) {
                if (line.includes('Day')) {
                    i++;
                    if (!processedData.destinations) {
                        processedData.destinations = [];
                    }
                    processedData.destinations.push({day : this.parseDay(line)})
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
                processedData.destinations[i].activities = this.parseComma(line);
            } else if (line.includes('Items')) {
                processedData.destinations[i].items = this.parseComma(line);
            } else if (line.includes('Destination')){
                processedData.destinations[i].destination = this.parseColon(line);
            } else if (line.includes('Description')){
                processedData.destinations[i].description = this.parseColon(line);   
            } else if (line.includes('Rating from 1-5')){
                processedData.destinations[i].rating = this.parseColon(line);
            } else if (line.includes('Budget')){
                processedData.destinations[i].budget = this.parseColon(line);
            } else if (line.includes('Physical Intensity from 1-5')){
                processedData.destinations[i].intensity = this.parseColon(line);
            } else if (line.includes('Address')){
                processedData.destinations[i].address = this.parseColon(line);
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