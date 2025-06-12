from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Annotated
from models import Deck
from database import get_db
from schemas.deck import DeckBase

router = APIRouter(prefix="/deck", tags=["Deck"])

db_dependency = Annotated[Session, Depends(get_db)]

#Deck - Create
@router.post("/create")
async def create_deck(deck: DeckBase, db: db_dependency):
    db_deck = Deck(deck_name=deck.deck_name, user_id=deck.user_id)
    db.add(db_deck)
    db.commit()
    db.refresh(db_deck)
    return deck

#Deck - Update
@router.put("/update/{deck_id}")
async def update_deck(deck_id: int, updated_deck: DeckBase, db: db_dependency):
    deck = db.query(Deck).filter(Deck.id==deck_id).first()
    if not deck:
        raise HTTPException(status_code=404, detail="Deck not found")
    
    deck.deck_name = updated_deck.deck_name
    db.commit()
    db.refresh(deck)
    return deck

#Deck - Delete
@router.delete("/delete/{deck_id}")
async def delete_deck(deck_id: int, db: db_dependency):
    deck = db.query(Deck).filter(Deck.id == deck_id).first()
    if not deck:
        return None
    db.delete(deck)
    db.commit()