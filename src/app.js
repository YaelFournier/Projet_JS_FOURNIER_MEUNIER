import { Provider } from "./provider";
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


