/* =============================================
                    Imports
============================================= */
import 'dotenv/config'
/* =============================================
                    Util
============================================= */
const getEnvironmentVariable = (
    variable: string,
    defaultValue: string|number|undefined = undefined
): string|number|undefined => {
    if((process.env[variable] === undefined) && defaultValue === undefined){
        // eslint-disable-next-line max-len
        throw new Error(`Mandatory environment variable ${variable} was not set.`)  
    }
    if(
        process.env[variable] === undefined 
        && defaultValue !== undefined
    ) {
        // eslint-disable-next-line no-console, max-len
        console.info(`Environment variable ${variable} was not set. Using default: ${defaultValue}`)
    }
    return process.env[variable] ?? defaultValue
}

/* =============================================
                    Variables
============================================= */
// eslint-disable-next-line import/prefer-default-export
export const 
    EXAMPLE_VARIABLE = getEnvironmentVariable('EXAMPLE_VARIABLE', 1)