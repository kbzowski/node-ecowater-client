import axios from "axios";
import {galons_to_litres} from "./helpers";


const ua = 'User-Agent: Dalvik/2.1.0 (Linux; U; Android 9; MI 6 MIUI/V11.0.5.0.PCACNXM)'

let headers = {}

export async function auth(email, password) {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://user-field.aylanetworks.com/users/sign_in.json',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': ua,
            },
            data: {
                user: {
                    email,
                    password,
                    application: {
                        app_id: "ecowater-mobile-id",
                        app_secret: "ecowater-mobile-9026832"
                    }
                }
            }
        })

        headers = {
            'Authorization': `auth_token ${response.data['access_token']}`,
            'Content-Type': 'application/json',
            'User-Agent': ua,
        };
    } catch (error) {
        throw new Error("Wrong email or password")
    }
}


export async function last_update_time() {
    const update_data = await axios({
        method: 'get',
        url: 'https://user-field.aylanetworks.com/apiv1/dsns/AC000W007094529/properties/get_frequent_data.json',
        headers,
    })

    return new Date(update_data.data.property.data_updated_at)

}

export async function update_stats() {
    await axios({
        method: 'post',
        url: 'https://user-field.aylanetworks.com/apiv1/dsns/AC000W007094529/properties/get_frequent_data/datapoints.json',
        headers,
        data: {
            datapoint: {value: 1.0}
        }
    })
}

function get_status(status) {
    switch (status) {
        case 0: return "Operational"
        case 2: return "Regeneration"
        default: return `Unknown: ${status}`
    }
}

export async function get_stats() {
    const props = ['days_since_last_regen', 'treated_water_avail_gals', 'avg_daily_use_gals', 'regen_time_rem_secs',
        'capacity_remaining_percent', 'regen_status_enum', 'average_exhaustion_percent', 'out_of_salt_estimate_days',
        'salt_level_tenths', 'gallons_used_today', 'current_water_flow_gpm'
    ]
    const query = props.map(p => `names[]=${p}`).join('&')
    const data_response = await axios({
        method: 'get',
        url: 'https://user-field.aylanetworks.com/apiv1/dsns/AC000W007094529/properties.json?' + query,
        headers,
    })

    const stats = {}

    for (const item of data_response.data) {
        const name = item.property.name;
        const value = item.property.value;
        switch (name) {
            case "avg_daily_use_gals": {
                stats['avg_daily_use_gals'] = galons_to_litres(value);
                break;
            }
            case "treated_water_avail_gals": {
                stats['treated_water_avail_gals'] = galons_to_litres(value);
                break;
            }
            case "days_since_last_regen": {
                stats['days_since_last_regen'] = value;
                break;
            }
            case "regen_time_rem_secs": {
                stats['regen_time_rem'] = new Date(value * 1000);
                break;
            }
            case "capacity_remaining_percent": {
                stats['capacity_remaining_percent'] = value / 10.0;
                break;
            }
            case "average_exhaustion_percent": {
                stats['average_exhaustion_percent'] = (1000 - value) / 10.0;
                break;
            }
            case "out_of_salt_estimate_days": {
                stats['out_of_salt_estimate_days'] = value;
                break;
            }
            case "salt_level_tenths":
                stats['salt_level_tenths'] = value;
                break;
            case "gallons_used_today":
                stats['gallons_used_today'] = galons_to_litres(value);
                break;
            case "regen_status_enum":
                stats['status'] = get_status(value);
                break;
            case "current_water_flow_gpm":
                stats['current_water_flow'] = galons_to_litres(value);
                break;
        }
    }

    return stats;
}
