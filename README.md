![Bilklubben](https://raw.githubusercontent.com/rognstadragnar/bilklubben/master/githubimg.png)


# Case: Bilklubben
Prosjektoppgave i IINI2001-A 16H av Ragnar Aasen Rognstad

http://bilklubben.rognstad.me (hostet gratis på Heroku)

## Funksjonalitet
I tillegg til registrering og innlogging fokuserte jeg mye på å gjøre bestillingsfunksjonen best mulig, og den synes jeg har blitt bra. 
Bestillingssiden oppdaterer opptatte biler og opptatte datoer ut i fra brukerens valg uten at siden oppdateres, dette på bakgrunn av at 
siden er i stor grad bygd opp med AJAX og ReactJS, som gir brukeren en god opplevelse.

Det er enkelt å endre abonnement og å legge til poeng, samt se sine ordre. Siden har også en oversikt over biler(både med beskrivelse og lokasjon) og nyheter("Aktuelt").

Jeg er også fornøyd med sidens design og responsivitet, som er gjort helt fra bunnen (tok meg også den frihet å lage logo til casen).

## Teknologi
Jeg valgte å gå nokså langt utover pensum, siden jeg har brukt mye tid på webutvikling fra før av, og bruke teknologier og teknikker som arbeidsgivere etterspør.
#### Frontend
Nettsidens stilark ble skrevet i språket [SCSS](http://sass-lang.com/), som er en moderne "videreføring" av CSS som har logikk og variabler, og gjør det svært enkelt å skrive modulær gjennbrukbar kode. Jeg har ikke brukt noe frontend-bibliotek (a lá Bootstrap e.l.), men på mye av sidens responsivitet har jeg brukt et selvskrevet grid-system ([Simple-flexgrid](https://www.npmjs.com/package/simple-flexgrid)). Utover det er alt skrevet for hånd.

All javascript, både på serverside og frontend, er skrevet med i den nyeste versjonen av Javascript(ES2015).
For bedre bruker opplevelse har jeg brukt Facebook sitt Javascript-rammeverk [REACT](https://facebook.github.io/react/) på funksjonene for loggin, registrering og spesielt bestilling. Datepikeren [PIKADAY](https://github.com/dbushell/Pikaday) skal også nevnes.

[Axios](https://github.com/mzabriskie/axios) er brukt som http-klient (altså for å sende og motta AJAX).

SCSS og ES2015-javascript må kompileres til 'gammeldags' kode slik at nettleseren kan kjøre den, noe jeg har brukt byggeverktøyene [GULP](http://gulpjs.com/) og [Webpack](https://webpack.github.io/) til - Webpack gjør det også mulig å importere filer enkelt i Javascript.

#### Backend
Nettstedets backend er skrevet i NodeJS med Express-rammeverket. Siden mye av nettstedets funksjonalitet er bygd opp med Ajax er mye av backend satt opp som en API som returnerer JSON. (Dette fordi det da er enkelt å videreutvikle)

Her er koden som henter ut biler fra databasen og returnerer det som JSON når serveren får en GET-request til http://bilklubben.rognstad.me/api/getbiler.
```Javascript 
// i filen ./server/routes/routes.js

router.get('/api/getbiler', (req, res) => {
  let cars = [];
  Car.findAll()
  .then(car => {
    car.map((v) => {cars.push(v.dataValues)})
  })
  .then(() => res.status(200).json({biler: cars}))
  .catch(err => res.statis(404).json({error: 'fant ikke biler'}))
})
```

Skoledatabasen kjører MySQL og jeg har brukt Sequelize som ORM, som tvinger deg til å skrive model-definisjoner og andre best-practices som gir det god, gjenbrukbar kode. 

##### Eksempel på en slik model:
```Javascript
// i filen ./server/models/Order.js

import Sequelize from 'sequelize';

const Order = {
    id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    startdate: {
        type: Sequelize.DATE,
        allowNull: false

    },
    enddate: {
        type: Sequelize.DATE,
        allowNull: false

    },
    cost: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
};

export default Order;
```

For View-laget brukte jeg templating-språket Pug, som express-rammeverket kompiler til HTML. Pug gjør det enkelt å skrive å modulær kode basert på layouts, som i tillegg er syntaks-messig pen å se på.

Her er eksempelvis koden for http://bilklubben.rognstad.me/biler
```Pug
// i filen ./client/views/biler.pug

extends layout/main

block content
    .biler-page
        .biler-page-content
            h2 Våre fantastiske biler
            each bil in biler
                a(href='/biler/'+ bil.id).biler
                        .biler-bg(style='background-image: url(/assets/img/biler/' + bil.id + '/'  + bil.imgsm +')' )
                        .biler-desc
                            span.biler-merke 
                                span #{bil.make} 
                                span #{bil.model}
                            span.biler-info Mer info



block scripts
    script(src='/assets/scripts/bundle.js')
    
block variables
    - var tittel = 'Våre biler | Bilklubben - Revolusjonerende'
```


## Sikkerhet 
Nettstedet bruker Sessions for bla. innlogging og autentisering. Jeg satte opp egen session-store i databasen som serveren bruker. SessionID blir lagret i en Cookie i nettleseren.

Sequelize passer på at SQL-injection ikke fungerer, mens [Helmet.js](https://github.com/helmetjs/helmet) beskytter mot bla. XSS-angrep.

Passord blir kryptert med [Bcrypt](https://www.npmjs.com/package/bcrypt) før de lagres i databasen, og Bcrypt sammenligner også passordene ved innlogging.

Ved en fullverdig implementering av et slikt nettsted ville det også vært viktig med SSL (https) for å sikre datatrafikken til og fra brukeren.



## Videre arbied
Nettstedet er utviklet for å enkelt kunne vidreutvikles.

Eksempelvis ville det vært naturlig å lage en admin-del som gjør det enkelt å legge til nyheter og biler, samt administrere ordre.




Siden er testet i Chrome, Safari og Firefox på Mac, samt Chrome på Android og Safari på iOS.

Det skal også nevnes at fontene som er brukt er lastet fra Adobe Typekit, og siden trekker derfor inn endel javascript fra Typekit.net.