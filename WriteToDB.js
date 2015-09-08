//The only function of this script is to feed this data into mongodb. We'll replace this once we have
//a better system for verifying and adding new links. 
var MongoClient = require('mongodb').MongoClient,
    format = require('util').format;
var stories = ["http://www.readbookonline.net/readOnLine/54197/",
    "http://www.eldritchpress.org/ac/jr/041.htm",
    "http://www.vcu.edu/engweb/webtexts/hour/",
    "http://www.fsgworkinprogress.com/2011/05/orientation-by-daniel-orozco/",
    "http://www.newyorker.com/archive/1948/05/15/1948_05_15_031_TNY_CARDS_000214135?currentPage=3",
    "http://www.npr.org/programs/death/readings/stories/bart.html",
    "http://www-rohan.sdsu.edu/faculty/dunnweb/rprnts.omelas.pdf",
    "http://www.gutenberg.org/files/26967/26967-h/26967-h.htm",
    "http://www.gutenberg.org/files/25078/25078-h/25078-h.htm",
    "http://www.hungermtn.org/a-lack-of-order-in-the-floating-object-room/",
    "http://web.ics.purdue.edu/~rebeccal/lit/238f11/pdfs/HappyEndings_Atwood.pdf",
    "http://www.esquire.com/fiction/fiction/ray-bradbury-last-night-of-the-world-0251",
    "http://www.url-der.org/a_clean_well_lighted_place.pdf",
    "http://www.massey.ac.nz/massey/fms/Colleges/College%20of%20Humanities%20and%20Social%20Sciences/EMS/Readings/139.105/Additional/How%20to%20Become%20a%20Writer%20-%20Lorrie%20Moore.pdf",
    "http://www.thrivenotes.com/the-last-answer/",
    "http://www.gutenberg.org/files/375/375-h/375-h.htm",
    "http://www.terrybisson.com/page6/page6.html",
    "https://docs.google.com/viewer?a=v&q=cache:viKvJXco4i4J:www.daltonvoorburg.nl/file/5156/1068724209/The%2BWay%2Bup%2Bto%2BHeaven.doc+&hl=en&gl=us&pid=bl&srcid=ADGEESiHAilfrml23HzptGd4rvylyI3K69Bhl5BG6Edl7rJx4ML-YNUrpmO-Ct94wI-Hi_kr9grE0wEKILlXZHmhQlUC_XYINr_mz7OkJcPIGnu1VSTh59PIT9y8aKp6u6NQHvVW7hZn&sig=AHIEtbQW3R7rekFAFsNMsmiLiYIRe-DCFw",
    "http://www.forum2.org/mellon/lj/flwrs.html",
    "http://pegasus.cc.ucf.edu/~surette/goodman.html",
    "http://ayersamazingwiki.wikispaces.com/file/view/Good+Country+People+Full+Text.pdf",
    "http://www.galactanet.com/oneoff/theegg_mod.html",
    "http://www.coldbacon.com/writing/borges-tlon.html",
    "http://www.online-literature.com/james_joyce/958/",
    "http://www.jacklondons.net/buildafire.html",
    "http://www.eastoftheweb.com/short-stories/UBooks/Bet.shtml",
    "http://www.neilgaiman.com/mediafiles/exclusive/shortstories/emerald.pdf",
    "http://www.koapp.narod.ru/english/fantast/book34.htm",
    "http://creepypasta.wikia.com/wiki/Psychosis",
    "http://www.veddma.com/veddma/Veldt.htm",
    "http://webcache.googleusercontent.com/search?q=cache:http://www.scribd.com/doc/52606043/Thomas-Pynchon-Entropy",
    "http://www.newyorker.com/archive/2003/04/21/030421fi_fiction",
    "http://www.gutenberg.org/files/5200/5200-h/5200-h.htm",
    "http://www.eastoftheweb.com/short-stories/UBooks/OpeWin.shtml",
    "http://www.online-literature.com/dostoevsky/3368/",
    "http://www.george-orwell.org/A_Hanging/0.html",
    "http://www.continuityofparks.com/by-cortazar/",
    "http://gaslight.mtroyal.ca/bottlimp.htm",
    "http://www.continuityofparks.com/by-cortazar/",
    "http://americanliterature.com/author/shirley-jackson/short-story/the-lottery",
    "http://kalamazoo.coop/sites/default/files/Good%20Old%20Neon.pdf",
    "http://fiction.eserver.org/short/happy_prince.html",
    "http://fiction.eserver.org/short/araby.html",
    "http://forwearemany.files.wordpress.com/2009/04/sandkings.pdf",
    "http://abs.kafkas.edu.tr/upload/19/Teenage_Wasteland.pdf",
    "http://qntm.org/responsibility",
    "http://records.viu.ca/~lanes/english/hemngway/vershort.htm",
    "http://en.wikisource.org/wiki/The_Repairer_of_Reputations",
    "http://www.burningbuilding.com/zombie.htm",
    "http://merry-fates.livejournal.com/76847.html",
    "http://www.scribd.com/doc/33096/Bruiser-A-street-sweeper-s-tales",
    "http://nbu.bg/webs/amb/american/6/carver/cathedral.htm",
    "http://www.bartleby.com/129/",
    "http://squid314.livejournal.com/293753.html",
    "http://www.newyorker.com/fiction/features/2012/10/15/121015fi_fiction_saunders?currentPage=all",
];
//connect away
MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if (err) throw err;
    console.log("Connected to Database");
    //simple json record
    for (var i = 0; i < stories.length; i++) {
        console.log("writing for i = " + i);
        var document = {
            sno: i,
            link: stories[i]
        };
        //insert record
        db.collection('readDB').insert(document, function(err, records) {
            if (err) throw err;
            console.log("Record added as " + records[0]._id);
        });
    }
});