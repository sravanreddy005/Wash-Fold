import Swal from 'sweetalert2';

export const successAlert = (message: string) => {
    return new Promise((resolve, reject) => {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: message,
            width: 300,
            timer: 2000
        });
        resolve(true);
    });
}

export const errorAlert = (message: string) => {
    return new Promise((resolve, reject) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
            width: 400,
            timer: 2000
        });
        resolve(true);
    });
}

export const warning = (message: string) => {
    return new Promise((resolve, reject) => {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: message,
            width: 400,
            timer: 2000
        });
        resolve(true);
    });
}

export const deleteConfirmAlert = (message: string) => {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: 'Are you sure?',
            text: message,
            icon: 'warning',
            width: 300,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.value) {
                resolve(true);
            }else{
                resolve(false);
            }
        })
    });
}

export const changeConfirmAlert = (message: string) => {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: 'Are you sure?',
            text: message,
            icon: 'warning',
            width: 300,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                resolve(true);
            }else{
                resolve(false);
            }
        })
    });
}

export const logoutConfirmAlert = () => {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: '',
            text: 'Are you sure want to logout ?',
            icon: 'warning',
            width: 300,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                resolve(true);
            }else{
                resolve(false);
            }
        })
    });
}

export const confirmAlert = (message: string) => {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: '',
            text: message,
            icon: 'success',
            width: 400,
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'okay',
        }).then((result) => {
            if (result.value) {
                resolve(true);
            }else{
                resolve(false);
            }
        })
    });
}