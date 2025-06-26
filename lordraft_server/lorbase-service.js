class LorbaseService {
    static async getDeckJsonFromCode(deckCode) {
        const res = await fetch(`${Constants.lorbaseUrl}/deckCode/${deckCode}`);
        if (!res.ok) {
            return null;
        }
        const deckJson = await res.json();
        return deckJson;
    }
}