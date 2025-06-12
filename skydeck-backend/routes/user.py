from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Annotated
from passlib.context import CryptContext

from models import User
from database import get_db
from schemas.user import UserBase

router = APIRouter(prefix="/user", tags=["User"])
db_dependency = Annotated[Session, Depends(get_db)]

# Password hasher
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


#Hash a password
def hash_password(password: str) -> str:
    return pwd_context.hash(password)


#User - Create
@router.post("/create")
async def create_user(user: UserBase, db: db_dependency):
    hashed_pw = hash_password(user.password)
    db_user = User(
        username=user.username,
        password=hashed_pw,
        email=user.email,
        unit_system=user.unit_system,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


#User - Update 
@router.put("/update/")
async def update_user(user_id: int, updated_user: UserBase, db: db_dependency):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.username = updated_user.username
    user.password = hash_password(updated_user.password) 
    user.email = updated_user.email
    user.unit_system = updated_user.unit_system
    user.role = updated_user.role

    db.commit()
    db.refresh(user)
    return user


#User - Delete
@router.delete("/delete")
async def delete_user(user_id: int, db: db_dependency):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(user)
    db.commit()
