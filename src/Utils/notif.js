import cogoToast from 'cogo-toast';

export const sendNotif = ( msg, type='success') => {
    return cogoToast[type](msg, {
        position: 'bottom-right',
        bar: { size: '6px' },
        hideAfter: 5,
    });
}