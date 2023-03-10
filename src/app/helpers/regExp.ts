
export const mobileRegx = /^[0][0-9]{10}$/;
export const passwordRegx = /^(?=.*\d)(?=.*[!@#$%^&*_])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
export const emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const pincodeRegx = /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/;
export const alnumRegx = /^[a-zA-z0-9]+([\s][a-zA-Z0-9]+)*$/;
export const alphaRegx = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
export const numRegx = /^[0-9]+$/;
export const alphaWithoutSpaceRegx = /^[a-zA-Z]+$/;
export const alnumSpecialRegx = /^[A-Za-z0-9? ,_-]+$/;
export const addressRegx = /^[A-Za-z0-9/ ,_.-]+$/;
export const imageRegx = /^([a-zA-Z0-9\s_\\.\-:])+(.png|.jpg|.jpeg|.gif|)+$/;
export const urlRegx = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}(\.[a-z]{2,6}|:[0-9]{3,4})\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;
export const nonHTMLRegx = /^[A-Za-z0-9/ ,)(@#!*+=^._-]+$/;
export const currencyCodeRegx = /^([a-zA-Z]){3}$/;
export const dayMonthRegx = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])$/;
export const dateRegx = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
export const dateRegx2 = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
export const timeRegx = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
export const fileRegx = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.xls|.xlsx)+$/;
export const floatRegx = /^(?!0\d)\d*(\.\d+)?$/;
export const floatWithNegativeRegx = /^-?[0-9]\d*(\.\d+)?$/;
export const adhaarRegx = /(^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$)|(^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$)/;
export const panCardRegx = /[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
export const gstnRegx = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
export const passportRegx = /^[A-Z]{1}[0-9]{7}$/;