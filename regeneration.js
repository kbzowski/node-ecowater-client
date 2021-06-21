import {auth, regenerate} from "./api";

try{
    await auth(process.env.ECOWATER_EMAIL, process.env.ECOWATER_PASSWORD);
} catch (e) {
    console.error(e)
    process.exit(1);
}

const device = process.env.ECOWATER_DEVICE

try {
    const result = await regenerate(device)
} catch (e) {
    console.error(e)
}