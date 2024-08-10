class Parser {
    processData(longText) {
        const processedData = {}
        var i = -1;
        longText.forEach(line => {
            if (line.includes('##')) {
                processedData.title = this.parseTitle(line);
            } else if (line.includes('#')) {
                i++;
                if (!processedData.days) {
                    processedData.days = [];
                }
                processedData.days.push({day : this.parseDay(line)})
            } else if (line.includes('Activity Recommendation')) {
                processedData.days[i].activities = this.parseComma(line);
            } else if (line.includes('Items')) {
                processedData.days[i].items = this.parseComma(line);
            } else if (line.includes('Destination')){
                processedData.days[i].destination = this.parseColon(line);
            } else if (line.includes('Description')){
                processedData.days[i].description = this.parseColon(line);   
            } else if (line.includes('Rating from 1-5')){
                processedData.days[i].rating = this.parseColon(line);
            } else if (line.includes('Budget')){
                processedData.days[i].budget = this.parseColon(line);
            } else if (line.includes('Physical Intensity from 1-5')){
                processedData.days[i].intensity = this.parseColon(line);
            }
        });
        return processedData;
    }

    parseTitle(text) {
        const parts = text.split('##');
        return parts[1].trim();
    }

    parseDay(text) {
        const parts = text.split('#');
        return parts[1].trim();
    }

    parseColon(text) {
        const splittedText = text.split(':').filter((line) => line !== '');
        return splittedText[1].trim();
    }

    parseComma(text){
        const splittedText = this.parseColon(text).split(', ');
        return splittedText;
    }
}

export default Parser;