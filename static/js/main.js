const currency_store_name = 'currencies';
const conversion_store_name = 'conversions';
const currency_query = 'https://free.currencyconverterapi.com/api/v5/currencies'
let convertion_query = 'https://free.currencyconverterapi.com/api/v5/convert?q=USD_PHP&compact=ultra'

function openDatabase(){
    if(!navigator.serviceWorker) return Promise.resolve();

    return idb.open('procurrency', 1, upgradeDb => {
        const curency_store = upgradeDb.createObjectStore(currency_store_name, {
            // TODO: Make a primary key here
            keypath: 'currencyName'
        });
        const conversion_store = upgradeDb.createObjectStore(conversion_store_name, {
        })
        //TODO: Create indexes here
    });
}

function register_serviceWorker(){
    if(!navigator.serviceWorker) return;
    
    navigator.serviceWorker.register('./sw.js').then(reg => {
        // not called from service worker. exit early
        if(!navigator.serviceWorker.controller) return;

        if(reg.waiting){
            update_ready(reg.waiting);
            return;
        }

        if(reg.installing){
            track_installing(reg.waiting);
            return;
        }

        reg.addEventListener('updatefound', () => track_installing(reg.installing));

        // On update reload bug fix var..
        let refreshing;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            // fix bug (infini reload)
            if(refreshing) return;
            window.location.reload();
            refreshing = true;
        });
    });
}

function track_installing(sworker){
    sworker.addEventListener('statechange', () => {
        if(sworker.state == 'installed') update_ready(sworker);
    });
}

const db_promise = openDatabase();
register_serviceWorker();

function get_currencies(){
    db_promise.then(db => {
        if(!db){
            //TODO: fetch and store in db
        }

    });
    //currency_objs = 
}