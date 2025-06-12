from pydantic import BaseModel

class DeckBase(BaseModel):
    deck_name: str
    user_id: int