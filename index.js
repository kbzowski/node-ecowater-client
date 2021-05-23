import {sleep} from "./helpers";
import {auth, get_stats, last_update_time, update_stats} from "./api";
import dotenv from "dotenv"

dotenv.config();

try{
    await auth(process.env.ECOWATER_EMAIL, process.env.ECOWATER_PASSWORD);
} catch (e) {
    console.error(e)
    process.exit(1);
}

const device = process.env.ECOWATER_DEVICE

while(true) {

    const last_update = await last_update_time(device);
    const now = new Date();
    const diff = (now.getTime() - last_update.getTime()) / 1000;
    if (diff < 10) break;

    await update_stats(device);
    await sleep(5000)
}

const stats = await get_stats(device);

console.log(`Average daily use: ${stats.avg_daily_use_gals.toFixed(2)} litres`);
console.log(`Treated water available: ${stats.treated_water_avail_gals.toFixed(2)} litres`);
console.log(`Litres used today: ${stats.gallons_used_today.toFixed(2)}`)
console.log('')
console.log(`Status: ${stats.status}`)
console.log(`Days since last regen: ${stats.days_since_last_regen}`);
console.log(`Regen remaining time: ${stats.regen_time_rem.toISOString().substr(11, 8)}`);
console.log(`Remaining ion-exchange capacity: ${stats.capacity_remaining_percent}% (min: ${stats.average_exhaustion_percent}%)`)
console.log(`Current water flow: ${stats.current_water_flow} l/min`)
console.log('')
console.log(`Salt level: ${stats.salt_level_tenths}%`)
console.log(`Out of salt estimate days: ${stats.out_of_salt_estimate_days}`)
