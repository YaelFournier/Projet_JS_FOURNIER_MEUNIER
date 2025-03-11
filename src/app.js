import { Provider } from "./provider";
import {PageCharacters} from './views/PageCharacters'
import { SERVER } from "./config";

Provider.loadCharacters(SERVER);
Provider.loadEquipments(SERVER);
Provider.loadRatings(SERVER);
Provider.loadFavorites(SERVER);

const routes = [
    {
        path : "/characters",
        component : Character,
    },
    {
        path : "/equipments",
        component : Equipment,
    },
    {
        path : "/ratings",
        component : Rating,
    },
    {
        path : "/favorites",
        component : Favorite,
    }
]

const http = require("http");

const app = http.createServer((req, res) => {
    console.log(`Requete reçue :${req.method} ${req.url}`);
    const route = routes.find(route => route.path === req.url);

    if (req.method === "GET" && route){
        switch (route.path){
            case "/characters" :
                let data = Provider.loadCharacters(SERVER);
                let characters = Provider.createCharacters(data);
                res.writeHead(200, {"Content-Type": ""});
                let pcharacters = new PageCharacters(characters);
                res.end(pcharacters.afficher());
                break;
        }

    }
    else{
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        // p404 = new Page404();
        res.end(); // p404.afficher()
    }
});


server.listen(8000, () => {
    console.log("Serveur lancé sur http://localhost:8000");
});