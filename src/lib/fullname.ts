/**
 * 
 * @param name
 * @param short 
 * @returns string 
 */
//type
interface FullNameProps {
    prefix?: string | null,
    fname?: string | null,
    mname?: string | null,
    lname?: string | null,
    suffix?: string | null
}
function fullname(name: FullNameProps, short: boolean = false) {
    let fullname = []

    //Add Prefix If It Exists
    if (typeof name.prefix !== 'undefined') {
        fullname.push(name.prefix)
    }

    //Add First Name (!This Field is Required)
    fullname.push(name.fname)

    //Conditionally Add Middle Name
    if (name?.mname) {
        let val = short ? `${name.mname?.substring(0, 1)}.` : `${name.mname}`
        fullname.push(val)
    }

    //Add Last Name (!This Field is Required)
    fullname.push(name.lname)

    //Add Suffix If It Exists
    if (typeof name.suffix !== 'undefined') {
        fullname.push(name.suffix)
    }

    return fullname.join(" ") //JOIN Name
}

export default fullname;