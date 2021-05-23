export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


export const galons_to_litres = (galons) => galons * 3.785411784;