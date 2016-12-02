export default (query) => {
    let flashMsg = {};
    if (query) {
        switch (query.status) {
        case 'loggetut':
            flashMsg.msg = 'Du har blitt logget ut.';
            flashMsg.type = 'positive'
            return flashMsg;
        case 'loggetinn':
            flashMsg.msg = 'Du har blitt logget inn.';
            flashMsg.type = 'positive'
            return flashMsg;
        case 'registrert':
            flashMsg.msg = 'Du har blitt registrert.';
            flashMsg.type = 'positive'
            return flashMsg;
        case 'ikkelov':
            flashMsg.msg = 'Du har ikke rettigheter til siden du prøvde å besøke.';
            flashMsg.type = 'negative'
            return flashMsg;
        default:
            return false
        }
    } 
    else {return false}
}