import moment from "moment";

/**
 * function for setting a delay in between search requests
 *
 * @returns void
 */
export default function debounce(callback:Function, timeout:number = 1000){
    return (...args:string[]) => {
        setTimeout(() => {
            callback(...args);
        }, timeout);
    }
}

/**
 * function for checking if field is empty
 *
 * @returns boolean
 */
export function cannotBeEmpty(element:any){
    if (element.value.trim().length === 0 || element.value == undefined){
        return false;
    }
    return true;
}

/**
 * function for validating name format
 *
 * @returns boolean
 */
export function validateName(name:string) {
    //var regex = /^[A-Z][a-z]*$/;
    var regex = /^[A-Z][A-Za-z\s]*$/;
    return regex.test(name);
}

/**
 * function for validating contact number
 *
 * @returns boolean
 */
export function validateNumber(number:string){
    var regex = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
    return regex.test(number);
}

/**
 * function for validating email format
 *
 * @returns boolean
 */
export function validateEmail(email:string) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

/**
 * function for removing error message
 *
 * @returns void
 */
export function removeError(e:any){
    e.target.classList.remove("is-invalid");
    const target = document.querySelector("#" + e.target.getAttribute("id") + "-feedback");
    if (target != null){
        target.innerHTML = "";
    }
}

/**
 * function for setting cookie for the JWT
 *
 * @returns void
 */
export function setCookie(ckey:string ,cvalue:string, exdays:number = 30) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = ckey + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * function for retrieving cookie for the JWT
 *
 * @returns string
 */
export function getCookie(ckey:string) {
    let key:string = ckey + "=";
    let decodedCookie:string = decodeURIComponent(document.cookie);
    let cookieAttributes:string[] = decodedCookie.split(';');
    for(let i = 0; i < cookieAttributes.length; i++) {
      let cookie = cookieAttributes[i];
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(key) == 0) {
        return cookie.substring(key.length, cookie.length);
      }
    }
    return "";
}

/**
 * function for deleting cookie for the JWT
 *
 * @param ckey key for the cookie
 * @returns void
 */
export function deleteCookie(ckey:string){
   if(getCookie(ckey)){
        document.cookie = ckey + "=;expires="+ 0 + ";path=/"
   }
   return;
}


/**
 * Returns a human readable format of date
 * @param date Date object
 * @returns string
 */
export function dateToHumanReadable(date:Date){
    return date != undefined ?
        moment(moment(new Date(date)).format('MMMM DD YYYY, h:mm:ss a'), 'MMMM Do YYYY, h:mm:ss a').fromNow()
        : "not yet updated";
}

/**
 * sets the error of input field with error message
 *
 * @param element Element
 * @param message string
 */
export function setErrorWithMessage(element:any, message:string){
    element.classList.remove('is-valid');
    element.classList.add('is-invalid');
    let e = document.querySelector("#" + element.getAttribute("id") + "-feedback");
    if (e != null){
        e.innerHTML = message;
    }
}

/**
 * removes error and set the field to success state
 *
 * @param element Element
 */
export function setSuccess(element:any){
    element.classList.add('is-valid');
    element.classList.remove('is-invalid');
    let e = document.querySelector("#" + element.getAttribute("id") + "-feedback");
    if (e != null){
        e.innerHTML = "";
    }
}

/**
 * Checks if user has any of roles.
 *
 * @param roles the roles the user has.
 * @param allowedroles the roles that you set to be allowed.
 * @returns boolean
 */
export function hasAnyRole(roles:Array<string>, allowedroles:Array<string>){

    if (typeof roles == "undefined") return;

    for (const role of roles){
        if (allowedroles.indexOf(role) != -1){
            return true;
        }
    }

    return false;
}

/**
 * Checks if user has the role.
 *
 * @param role the role the user has.
 * @param allowedRole the role that you set to be allowed.
 * @returns
 */
export function hasPermission(role:string, allowedRole:string){
    if (role == allowedRole){
        return true;
    }
    return false;
}

/**
 * Checks if user has all roles.
 *
 * @param roles the roles the user has.
 * @param allowedroles the roles that you set to be allowed.
 * @returns
 */
export function hasAllRoles(roles:Array<string>, allowedroles:Array<string>){
    if (typeof roles == "undefined") return;
    for (const role of roles){
        if (allowedroles.indexOf(role) == -1){
            return false;
        }
    }
    return true;
}
