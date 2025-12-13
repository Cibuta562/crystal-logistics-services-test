const reviews = [
    {
        author: "Anamaria Lupu",
        date: {
            ro: "acum 2 luni",
            en: "2 months ago",
            de: "vor 2 Monaten",
            fr: "il y a 2 mois",
            it: "2 mesi fa",
            pl: "2 miesiące temu"
        },
        text: {
            ro: "Promptitudine, profesionalism și corectitudine. Acestea sunt trei dintre cele mai importante calități ale echipei Crystal Logistics Service alături de care m-am simțit în siguranță făcând o mutare extrem de importantă pentru mine și pentru care era nevoie de mare atenție și grijă în transport. Totul a decurs ireproșabil! Recomand cu toată încrederea serviciile Crystal Logistics. O echipă care prioritizează interesul clientului mai presus de orice. Tot respectul!",
            en: "Promptness, professionalism, and integrity — these are three of the most important qualities of the Crystal Logistics Service team. I felt completely safe during a very important move that required great care and attention to transport. Everything went perfectly! I highly recommend Crystal Logistics. A team that puts the client's interest above all else. Much respect!",
            de: "Pünktlichkeit, Professionalität und Integrität – das sind drei der wichtigsten Qualitäten des Crystal Logistics Service Teams. Ich fühlte mich bei einem sehr wichtigen Umzug, der große Sorgfalt und Aufmerksamkeit beim Transport erforderte, absolut sicher. Alles verlief tadellos! Ich empfehle die Dienste von Crystal Logistics mit vollem Vertrauen weiter. Ein Team, das die Interessen des Kunden über alles stellt. Großen Respekt!",
            fr: "Rapidité, professionnalisme et intégrité – ce sont trois des qualités les plus importantes de l'équipe Crystal Logistics Service. Je me suis senti complètement en sécurité lors d'un déménagement très important qui nécessitait beaucoup de soin et d'attention pour le transport. Tout s'est déroulé parfaitement ! Je recommande vivement les services de Crystal Logistics. Une équipe qui place l'intérêt du client avant tout. Tout mon respect !",
            it: "Prontezza, professionalità e integrità: queste sono tre delle qualità più importanti del team Crystal Logistics Service. Mi sono sentita completamente al sicuro durante un trasloco molto importante che richiedeva grande attenzione e cura nel trasporto. Tutto è andato perfettamente! Raccomando vivamente i servizi di Crystal Logistics. Un team che mette l'interesse del cliente sopra ogni altra cosa. Tutto il mio rispetto!",
            pl: "Punktualność, profesjonalizm i uczciwość – to trzy najważniejsze cechy zespołu Crystal Logistics Service. Czułem się całkowicie bezpiecznie podczas bardzo ważnej przeprowadzki, która wymagała dużej uwagi i staranności w transporcie. Wszystko przebiegło bez zarzutu! Z pełnym zaufaniem polecam usługi Crystal Logistics. Zespół, który stawia interes klienta ponad wszystko. Wielki szacunek!"
        },
        rating: 5
    },
    {
        author: "Adina Vîlcan",
        date: {
            ro: "acum 3 luni",
            en: "3 months ago",
            de: "vor 3 Monaten",
            fr: "il y a 3 mois",
            it: "3 mesi fa",
            pl: "3 miesiące temu"
        },
        text: {
            ro: "Indiferent dacă am avut nevoie de transport rutier intern sau internațional, fiecare comandă a fost gestionată rapid și eficient. Echipa CLS este mereu disponibilă și răspunsurile vin repede – chiar și în afara orelor de program. Mi-au oferit soluții personalizate și au găsit mereu cele mai bune rute și prețuri.",
            en: "Whether I needed domestic or international road transport, every order was handled quickly and efficiently. The CLS team is always available, and responses come fast – even outside business hours. They offered personalized solutions and always found the best routes and prices.",
            de: "Unabhängig davon, ob ich nationalen oder internationalen Straßentransport benötigte, wurde jede Bestellung schnell und effizient abgewickelt. Das CLS-Team ist immer erreichbar und antwortet schnell – auch außerhalb der Geschäftszeiten. Sie boten maßgeschneiderte Lösungen und fanden stets die besten Routen und Preise.",
            fr: "Que j'aie eu besoin de transport routier national ou international, chaque commande a été gérée rapidement et efficacement. L'équipe CLS est toujours disponible, et les réponses sont rapides, même en dehors des heures de bureau. Ils m'ont offert des solutions personnalisées et ont toujours trouvé les meilleurs itinéraires et prix.",
            it: "Indipendentemente dal fatto che avessi bisogno di trasporto stradale nazionale o internazionale, ogni ordine è stato gestito in modo rapido ed efficiente. Il team CLS è sempre disponibile e le risposte arrivano velocemente, anche fuori orario di lavoro. Mi hanno offerto soluzioni personalizzate e hanno sempre trovato le rotte e i prezzi migliori.",
            pl: "Niezależnie od tego, czy potrzebowałem transportu drogowego krajowego, czy międzynarodowego, każde zamówienie zostało zrealizowane szybko i sprawnie. Zespół CLS jest zawsze dostępny, a odpowiedzi przychodzą szybko – nawet poza godzinami pracy. Zaoferowali spersonalizowane rozwiązania i zawsze znajdowali najlepsze trasy i ceny."
        },
        rating: 5
    },
    {
        author: "Adina Vîlcan",
        date: {
            ro: "acum 4 luni",
            en: "4 months ago",
            de: "vor 4 Monaten",
            fr: "il y a 4 mois",
            it: "4 mesi fa",
            pl: "4 miesiące temu"
        },
        text: {
            ro: "Excelentă colaborare, la nivel de comunicare și servicii de livrare. Totul clar, la obiect, amabil, prompt și cu înțelegere! Recomand cu căldură!",
            en: "Excellent collaboration, both in communication and delivery services. Everything was clear, friendly, prompt, and professional! Highly recommended!",
            de: "Ausgezeichnete Zusammenarbeit, sowohl in der Kommunikation als auch bei den Lieferdienstleistungen. Alles klar, sachlich, freundlich, prompt und verständnisvoll! Wärmstens empfohlen!",
            fr: "Excellente collaboration, tant au niveau de la communication que des services de livraison. Tout était clair, pertinent, aimable, rapide et compréhensif ! Je recommande vivement !",
            it: "Eccellente collaborazione, sia a livello di comunicazione che di servizi di consegna. Tutto chiaro, al punto, cortese, pronto e con comprensione! Lo consiglio vivamente!",
            pl: "Doskonała współpraca, zarówno na poziomie komunikacji, jak i usług dostawczych. Wszystko jasne, na temat, uprzejme, szybkie i ze zrozumieniem! Gorąco polecam!"
        },
        rating: 5
    },
    {
        author: "Narcisa Elena",
        date: {
            ro: "acum 3 luni",
            en: "3 months ago",
            de: "vor 3 Monaten",
            fr: "il y a 3 mois",
            it: "3 mesi fa",
            pl: "3 miesiące temu"
        },
        text: {
            ro: "Echipă profesionistă și atentă la detalii. Recomand cu încredere pentru orice tip de transport.",
            en: "A professional and detail-oriented team. Highly recommended for any type of transport.",
            de: "Professionelles und detailorientiertes Team. Mit Zuversicht für jede Art von Transport empfohlen.",
            fr: "Une équipe professionnelle et attentive aux détails. Recommandé en toute confiance pour tout type de transport.",
            it: "Team professionale e attento ai dettagli. Lo consiglio con fiducia per qualsiasi tipo di trasporto.",
            pl: "Profesjonalny zespół dbający o szczegóły. Polecam z pełnym zaufaniem do każdego rodzaju transportu."
        },
        rating: 5
    },
    {
        author: "Alex Dorian",
        date: {
            ro: "acum 3 luni",
            en: "3 months ago",
            de: "vor 3 Monaten",
            fr: "il y a 3 mois",
            it: "3 mesi fa",
            pl: "3 miesiące temu"
        },
        text: {
            ro: "Profesionalism și implicare, recomand cu încredere pentru orice tip de transport!",
            en: "Professionalism and dedication — I highly recommend them for any type of transport!",
            de: "Professionalität und Engagement – mit Zuversicht für jede Art von Transport empfohlen!",
            fr: "Professionnalisme et implication – je les recommande en toute confiance pour tout type de transport !",
            it: "Professionalità e impegno: li consiglio con fiducia per qualsiasi tipo di trasporto!",
            pl: "Profesjonalizm i zaangażowanie – polecam z pełnym zaufaniem do każdego rodzaju transportu!"
        },
        rating: 5
    }
];

export default reviews;