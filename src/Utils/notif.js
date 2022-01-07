import cogoToast from 'cogo-toast';

export const sendNotif = ( msg, type='success', pos='bottom') => {
    return cogoToast[type](msg, {
        position: `${pos}-right`,
        bar: { size: '6px' },
        hideAfter: 5,
    });
}