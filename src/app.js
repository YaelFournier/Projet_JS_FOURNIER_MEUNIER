import { Provider } from "./provider";
import { SERVER } from "./config";

Provider.loadCharacters(SERVER);
Provider.loadEquipments(SERVER);
Provider.loadRatings(SERVER);
Provider.loadFavorites(SERVER);

const routes = [
    
]
