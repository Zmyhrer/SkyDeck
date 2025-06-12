from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Annotated
from models import Element, Deck
from database import get_db
from schemas.element import ElementBase

router = APIRouter(prefix="/element", tags=["Element"])

db_dependency = Annotated[Session, Depends(get_db)]

#Element - Create
@router.post("/create")
async def create_element(element: ElementBase, db: db_dependency):
    db_element = Element(element_name=element.element_name, element_operator=element.element_operator, element_value=element.element_value, deck_id=element.deck_id)
    db.add(db_element)
    db.commit()
    db.refresh(db_element)
    return db_element

#Element - Read
@router.get("/read")
def read_elements_by_deck(deck_id: int, db: Session = Depends(get_db)):
    deck = db.query(Deck).filter(Deck.id == deck_id).first()
    if not deck:
        raise HTTPException(status_code=404, detail="Deck not found")

    return deck.elements
#Element - Update
@router.put("/update")
async def update_element(element_id: int, updated_element: ElementBase, db: db_dependency):
    element = db.query(Element).filter(Element.id==element_id).first()
    if not element:
        raise HTTPException(status_code=404, detail="Element not found")
    
    element.element_name = updated_element.element_name
    element.element_operator = updated_element.element_operator
    element.element_value = updated_element.element_value

    db.commit()
    db.refresh(element)
    return element

#Element - Delete
@router.delete("/delete")
async def delete_element(element_id: int, db: db_dependency):
    element = db.query(Element).filter(Element.id==element_id).first()
    if not element:
        return None
    db.delete(element)
    db.commit()