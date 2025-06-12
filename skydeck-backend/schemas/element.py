from pydantic import BaseModel

class ElementBase(BaseModel):
    element_name: str
    element_operator: str
    element_value: float
    deck_id: int