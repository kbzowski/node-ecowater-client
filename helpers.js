export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


export const galons_to_litres = (galons) => galons * 3.785411784;

export const Status = {
    Operational: 'Operational',
    Scheduled: 'Scheduled',
    Regenerating: 'Regenerating',
    None: 'None'
};