# routes.py
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Annotated
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session

# Initialize DB tables once when imported
models.Base.metadata.create_all(bind=engine)

db_router = APIRouter()

class ChoiceBase(BaseModel):
    choice_text: str
    is_correct: bool

class QuestionBase(BaseModel):
    question_text: str
    choices: List[ChoiceBase]

class DeckBase(BaseModel):
    deck_name: str
    user_id: int

class ElementBase(BaseModel):
    element_name: str
    element_operator: str
    element_value: float
    deck_id: int

class UserBase(BaseModel):
    username: str
    password: str
    email: str
    unit_system: str
    role: str

def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally: 
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]

#User - Create
@db_router.post("/User/Add")
async def create_user(user: UserBase, db: db_dependency):
    db_user = models.User(username=user.username, password=user.password, email=user.email, unit_system=user.unit_system, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return user

#User - Update
@db_router.put("/User/Update/{user_id}")
async def update_user(user_id: int, updated_user: UserBase, db: db_dependency):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.username = updated_user.username
    user.password = updated_user.password
    user.email = updated_user.email
    user.unit_system = updated_user.unit_system
    user.role = updated_user.role
    db.commit()
    db.refresh(user)
    return user

#User - Delete
@db_router.delete("/deleteUser/{user_id}")
async def delete_user(user_id: int, db: db_dependency):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        return None
    
    db.delete(user) 
    db.commit()

#Deck - Create
@db_router.post("/Deck/Create")
async def create_deck(deck: DeckBase, db: db_dependency):
    db_deck = models.Deck(deck_name=deck.deck_name, user_id=deck.user_id)
    db.add(db_deck)
    db.commit()
    db.refresh(db_deck)
    return deck

#Deck - Update
@db_router.put("/Deck/Update/{deck_id}")
async def update_deck(deck_id: int, updated_deck: DeckBase, db: db_dependency):
    deck = db.query(models.Deck).filter(models.Deck.id==deck_id).first()
    if not deck:
        raise HTTPException(status_code=404, detail="Deck not found")
    
    deck.deck_name = updated_deck.deck_name
    db.commit()
    db.refresh(deck)
    return deck

#Deck - Delete
@db_router.delete("/Deck/Delete/{deck_id}")
async def delete_deck(deck_id: int, db: db_dependency):
    deck = db.query(models.Deck).filter(models.Deck.id == deck_id).first()
    if not deck:
        return None
    db.delete(deck)
    db.commit()

#Element - Create
@db_router.post("/Element/Create")
async def create_element(element: ElementBase, db: db_dependency):
    db_element = models.Element(element_name=element.element_name, element_operator=element.element_operator, element_value=element.element_value, deck_id=element.deck_id)
    db.add(db_element)
    db.commit()
    db.refresh(db_element)
    return db_element

#Element - Update
@db_router.put("/Element/Update")
async def update_element(element_id: int, updated_element: ElementBase, db: db_dependency):
    element = db.query(models.Element).filter(models.Element.id==element_id).first()
    if not element:
        raise HTTPException(status_code=404, detail="Element not found")
    
    element.element_name = updated_element.element_name
    element.element_operator = updated_element.element_operator
    element.element_value = updated_element.element_value

    db.commit()
    db.refresh(element)
    return element

#Element - Delete
@db_router.delete("/Element/Delete")
async def delete_element(element_id: int, db: db_dependency):
    element = db.query(models.Element).filter(models.Element.id==element_id).first()
    if not element:
        return None
    db.delete(element)
    db.commit()
    


    
