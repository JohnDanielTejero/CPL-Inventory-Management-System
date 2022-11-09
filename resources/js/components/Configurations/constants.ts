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
    var regex = /^[A-Z\s][a-z\s]*$/;
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
